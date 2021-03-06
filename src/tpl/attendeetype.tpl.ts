import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {AttendeeType} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/attendeetype.tpl.html'))
  .node

function instructions(frag: DocumentFragment, data: AttendeeType): void {
  /** Options for formatting pass prices. */
  const PRICE_OPTIONS: Intl.NumberFormat = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // QUESTION: remove these lines to show cent amounts
    maximumFractionDigits: 0, // QUESTION: remove these lines to show cent amounts
  })
  frag.querySelector('.c-Pass__Attendee'         ) !.textContent = data.name
  frag.querySelector('[itemprop="priceCurrency"]') !.textContent = PRICE_OPTIONS.format(data.price)[0] // .charAt(0) // FIXME for USD only!
  frag.querySelector('[itemprop="price"]'        ) !.textContent = PRICE_OPTIONS.format(data.price).slice(1)
  ;(frag.querySelector('data[itemprop="priceCurrency"]') as HTMLDataElement).value = PRICE_OPTIONS.resolvedOptions().currency !
  new xjs.Element(frag.querySelector('[itemprop="priceSpecification"]') !)
    .attr('aria-label', `${data.price} ${PRICE_OPTIONS.resolvedOptions().currency}`)
    .trimInner()
}

/**
 * A `<dt.c-Pass__Attendee>`–`<dd.c-Pass__Price>` pair marking up info for a pass’s attendee type.
 */
const xAttendeeType: Processor<AttendeeType, object> = new Processor(template, instructions)
export default xAttendeeType
