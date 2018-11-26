import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Session} from '../interfaces'
import timeblock_processor from './timeblock.tpl'

const xjs = { ...xjs1, ...xjs2 }


interface OptsType {
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

/**
 * A `<div.o-Tablist[role="tablist"]>` component containing panels of `.c-Timeblock` components.
 * @param   frag the template content to process
 * @param   data an array of sessions
 * @param   opts additional processing options
 */
function instructions(frag: DocumentFragment, data: Session[], opts: OptsType): void {
  let container: xjs2.Element = new xjs.Element(frag.querySelector('[role="tablist"]') !)
	const program_panel = new Processor(container.node.querySelector('template') !, function (f: DocumentFragment, d: DateGroup, o: { index: number }) {
		f.querySelector('[role="tabpanel"]') !.id          = `${opts.id}-panel${o.index}`
		f.querySelector('[name="day"]'     ) !.textContent = xjs.Date.DAY_NAMES[d.date.getUTCDay()]
		f.querySelector('[name="date"]'    ) !.textContent = xjs.Date.format(d.date, 'M j')
		f.querySelector('time'             ) !.dateTime    = d.date.toISOString()
		new xjs.Element(f.querySelector('[name="panel"]') !).empty()
			.append(timeblock_processor.process(d.sessions))
		new xjs.Element(f.querySelector('.c-ProgramHn') !).trimInner()
	})
  /** An array, categorizing all the sessions of the conference by date. */
  const grouped_sessions: DateGroup[] = ((all_sessions) => {
    const returned: DateGroup[] = []
    all_sessions.forEach((session) => {
      let time_start: Date = new Date(session.startDate)
      if (!returned.find((group) => xjs.Date.sameDate(group.date, time_start))) {
        returned.push({
          date    : time_start,
          sessions: all_sessions.filter((s) => xjs.Date.sameDate(new Date(s.startDate), time_start)),
        })
      }
    })
    return returned
  })(data)
  container.append(...grouped_sessions.map((group, index) => program_panel.process(group, { index })))
}

export default new Processor(template, instructions)
