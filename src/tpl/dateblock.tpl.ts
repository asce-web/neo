import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ImportantDate} from '../interfaces'

const xjs = { ...xjs1, ...xjs2 }


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-dateblock.tpl.html'))
  .node

/**
 * A `<tr.c-DateBlock__Item>` subcomponent containing a pair of `<td>`s,
 * marking up this date range as an important date with date and description.
 * @param   frag the template content to process
 * @param   data an array of important dates
 */
function instructions(frag: DocumentFragment, data: ImportantDate[]): void {
  new xjs.HTMLTableSectionElement(frag.querySelector('.c-DateBlock')).populate(function (f: DocumentFragment, d: ImportantDate) {
    let date_start = new Date(d.startTime)
    let date_end   = new Date(d.endTime  )
    /**
     * @summary References to formatting elements.
     * @description We want to create these references before removing any elements from the DOM.
     * @private
     * @constant {!Object}
     */
    const formatting = {
      /** Start and end dates. */ dates: [...f.querySelectorAll('.c-DateBlock__Date')],
    }
    f.querySelectorAll('[itemprop~="startTime"]').forEach((time) => {
      new xjs.HTMLTimeElement(time)
        .dateTime(date_start)
        .textContent(xjs.Date.format(date_start, 'M j, Y'))
    })
    new xjs.HTMLTimeElement(f.querySelector('[itemprop="endTime"]'))
      .dateTime(date_end)
      .textContent(xjs.Date.format(date_end, 'M j, Y'))
    if (xjs.Date.sameDate(date_start, date_end)) {
      formatting.dates[1].remove()
    } else {
      formatting.dates[0].remove()
    }
    new xjs.HTMLElement(f.querySelector('.c-DateBlock__Date')).trimInner()

    new xjs.HTMLAnchorElement(f.querySelector('a')).attr({
      href    : d.url || null,
      itemprop: (d.url) ? 'url' : null,
    }).textContent(d.name)
  }, data)
}

export default new Processor(template, instructions)
