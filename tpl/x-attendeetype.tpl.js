const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary A `<dt.c-Pass__Attendee>`–`<dd.c-Pass__Price>` pair marking up info for a pass’s attendee type.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {!Object} data a JSON object that validates against some schema?
 * @param {string} data.name the attendee type
 * @param {number} data.price the price for this attendee type given a certain pass and registration period
 * @param   {!Object=} opts additional rendering options
 */
function xAttendeetype_renderer(frag, data, opts = {}) {
  /**
   * @summary Options for formatting pass prices.
   * @private
   * @const {Intl.NumberFormat}
   */
  const PRICE_OPTIONS = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
    maximumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
  })
  frag.querySelector('.c-Pass__Attendee'         ).textContent = data.name
  frag.querySelector('[itemprop="priceCurrency"]').value       = PRICE_OPTIONS.resolvedOptions().currency
  frag.querySelector('[itemprop="priceCurrency"]').textContent = PRICE_OPTIONS.format(data.price)[0] // .charAt(0) // FIXME for USD only!
  frag.querySelector('[itemprop="price"]'        ).textContent = PRICE_OPTIONS.format(data.price).slice(1)
  new xjs.HTMLElement(frag.querySelector('[itemprop="priceSpecification"]'))
    .attr('aria-label', `${data.price} ${PRICE_OPTIONS.resolvedOptions().currency}`)
    .trimInner()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-attendeetype.tpl.html'))
  .setRenderer(xAttendeetype_renderer)
