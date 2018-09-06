import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

import {RegistrationPeriod} from '../interfaces'

const xjs = { ...xjs1, ...xjs2 }


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-registrationicon.tpl.html'))
  .node

/**
 * A single `<p.c-RegPdIcon>` component indicating a registration period.
 * @param   frag the template content to process
 * @param   data a single registration period
 */
function instructions(frag: DocumentFragment, data: RegistrationPeriod): void {
  let date_start = (data.availabilityStarts) ? new Date(data.availabilityStarts) : null
  let date_end   = (data.availabilityEnds  ) ? new Date(data.availabilityEnds  ) : null

  frag.querySelector('i').textContent = data.$icon
  frag.querySelector('b').textContent = data.name

  /**
   * References to formatting elements.
   * We want to create these references before removing any elements from the DOM.
   */
  const formatting = {
    /** Colon after period name. */ colon: frag.querySelector('slot[name="colon"]'),
    /** Start and end dates. */     times: [...frag.querySelectorAll('time')],
    /** Dash between times. */      dash : frag.querySelector('slot[name="dash"]'),
  }
  if (date_start) {
    new xjs.HTMLTimeElement(formatting.times[0])
      .dateTime(date_start.toISOString())
      .textContent(xjs.Date.format(date_start, 'M j'))
  } else {
    formatting.colon.textContent = ' ends '
    formatting.times[0].remove()
    formatting.dash.remove()
  }
  if (date_end) {
    new xjs.HTMLTimeElement(formatting.times[1])
      .dateTime(date_end.toISOString())
      .textContent(xjs.Date.format(date_end, 'M j'))
  } else {
    formatting.colon.textContent = ' begins '
    formatting.times[1].remove()
    formatting.dash.remove()
  }

  new xjs.HTMLElement(frag.querySelector('small')).trimInner()
}

export default new Processor(template, instructions)
