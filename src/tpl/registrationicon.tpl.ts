import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

const xjs = { ...xjs1, ...xjs2 }


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-registrationicon.tpl.html'))
  .node

/**
 * @summary xListRegistrationicon renderer.
 * @description A `<ul>` element listing the registration periods in a legend.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.AggregateOffer} data a registration period, with:
 * @param {string} data.name the name of the registration period (e.g., 'Early Bird')
 * @param {string=} data.availabilityStarts the date on which this registration period starts
 * @param {string=} data.availabilityEnds the date on which this registration period ends
 * @param {string=} data.$icon the icon keyword of this registration period
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag, data, opts = {}) {
  let date_start = (data.availabilityStarts) ? new Date(data.availabilityStarts) : null
  let date_end   = (data.availabilityEnds  ) ? new Date(data.availabilityEnds  ) : null

  frag.querySelector('i').textContent = data.$icon
  frag.querySelector('b').textContent = data.name

  /**
   * @summary References to formatting elements.
   * @description We want to create these references before removing any elements from the DOM.
   * @private
   * @constant {!Object}
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
