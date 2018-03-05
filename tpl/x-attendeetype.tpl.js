const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary A `<dt.c-Pass__Attendee>`–`<dd.c-Pass__Price>` pair marking up info for a pass’s attendee type.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {!Object} data a JSON object that validates against some schema?
 * @param {string} data.name the attendee type
 * @param {number} data.price the price for this attendee type given a certain pass and registration period
 */
function xAttendeetype(frag, data) {
  const Pass = require('../class/Pass.class.js')
  frag.querySelector('.c-Pass__Attendee'         ).textContent = data.name
  frag.querySelector('[itemprop="priceCurrency"]').value       = Pass.PRICE_OPTIONS.resolvedOptions().currency
  frag.querySelector('[itemprop="priceCurrency"]').textContent = Pass.PRICE_OPTIONS.format(data.price)[0] // .charAt(0) // FIXME for USD only!
  frag.querySelector('[itemprop="price"]'        ).textContent = Pass.PRICE_OPTIONS.format(data.price).slice(1)
  new xjs.HTMLElement(frag.querySelector('[itemprop="priceSpecification"]'))
    .attr('aria-label', `${data.price} ${Pass.PRICE_OPTIONS.resolvedOptions().currency}`)
    .trimInner()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-attendeetype.tpl.html'))
  .setRenderer(xAttendeetype)
