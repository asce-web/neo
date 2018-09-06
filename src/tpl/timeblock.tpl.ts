import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

const xjs = { ...xjs1, ...xjs2 }


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-timeblock.tpl.html'))
  .node

type DataType = sdo.Event & {
	name     : string;
	startDate: string;
	endDate  : string;
}

/**
 * A `<tr.c-TimeBlock__Item>` subcomponent containing a pair of `<td>`s,
 * marking up this date range as a session with time and name.
 * @param   frag the template content to process
 * @param   data an array of sessions
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag: DocumentFragment, data: DataType[], opts = {}): void {
  new xjs.HTMLTableSectionElement(frag.querySelector('.c-TimeBlock')).populate(function (f, d, o = {}) {
    let time_start = new Date(d.startDate)
    let time_end   = new Date(d.endDate  )
    /**
     * @summary References to formatting elements.
     * @description We want to create these references before removing any elements from the DOM.
     * @private
     * @constant {!Object}
     */
    const formatting = {
      /** Start and end times. */ times: [...f.querySelectorAll('.c-TimeBlock__Times')],
    }
    f.querySelectorAll('[itemprop~="startDate"]').forEach((time) => {
      new xjs.HTMLTimeElement(time)
        .dateTime(time_start)
        .textContent(xjs.Date.format(time_start, 'g:ia'))
    })
    new xjs.HTMLTimeElement(f.querySelector('[itemprop="endDate"]'))
      .dateTime(time_end)
      .textContent(xjs.Date.format(time_end, 'g:ia'))
    if (time_start.toISOString() === time_end.toISOString()) {
      formatting.times[1].remove()
    } else {
      formatting.times[0].remove()
    }
    new xjs.HTMLElement(f.querySelector('.c-TimeBlock__Times')).trimInner()

    new xjs.HTMLAnchorElement(f.querySelector('a')).attr({
      href    : d.url || null,
      itemprop: (d.url) ? 'url' : null,
    }).textContent(d.name)
  }, data)
}

export default new Processor(template, instructions)
