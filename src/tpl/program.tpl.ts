import * as path from 'path'

import { Date as xjs_Date } from 'extrajs'
import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Session} from '../interfaces'
import xTimeBlock from './timeblock.tpl'


interface OptsTypeXProgram {
	/** provide a unique id for the program block */
	id: string;
}

/** A group of sessions, sharing the same day, on a program. */
interface DateGroup {
	/** The shared day. */
	date: Date;
	/** The sessions that share the same day. */
	sessions: Session[];
}

const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/program.tpl.html')) // NB relative to dist
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
  })
  .node

function instructions(frag: DocumentFragment, data: Session[], opts: OptsTypeXProgram): void {
  let container: xjs.Element = new xjs.Element(frag.querySelector('[role="tablist"]') !)
	const program_panel: Processor<DateGroup, { index: number }> = new Processor(container.node.querySelector('template') !, function instructions(f, d, o) {
		f.querySelector('[role="tabpanel"]') !.id          = `${opts.id}-panel${o.index}`
		f.querySelector('[name="day"]'     ) !.textContent = xjs_Date.DAY_NAMES[d.date.getUTCDay()]
		f.querySelector('[name="date"]'    ) !.textContent = xjs_Date.format(d.date, 'M j')
		f.querySelector('time'             ) !.dateTime    = d.date.toISOString()
		new xjs.Element(f.querySelector('[name="panel"]') !).empty()
			.append(xTimeBlock.process(d.sessions))
		new xjs.Element(f.querySelector('.c-ProgramHn') !).trimInner()
	})
  /** An array, categorizing all the sessions of the conference by date. */
  const grouped_sessions: DateGroup[] = ((all_sessions) => {
    const returned: DateGroup[] = []
    all_sessions.forEach((session) => {
      let time_start: Date = new Date(session.startDate)
      if (!returned.find((group) => xjs_Date.sameDate(group.date, time_start))) {
        returned.push({
          date    : time_start,
          sessions: all_sessions.filter((s) => xjs_Date.sameDate(new Date(s.startDate), time_start)),
        })
      }
    })
    return returned
  })(data)
  container.append(...grouped_sessions.map((group, index) => program_panel.process(group, { index })))
}

/**
 * A `<div.o-Tablist[role="tablist"]>` component containing panels of `.c-Timeblock` components.
 */
const xProgram: Processor<Session[], OptsTypeXProgram> = new Processor(template, instructions)
export default xProgram
