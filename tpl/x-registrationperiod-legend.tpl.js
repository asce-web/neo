const path = require('path')

const xjs = {
  Date: require('extrajs').Date,
  ...require('extrajs-dom'),
}

/**
 * @summary A `<p.c-RegPdIcon>` component marking up a registration period in a legend.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.AggregateOffer} data a JSON object representing a registration period
 * @param {string} data.name the name of the registration period (e.g., 'Early Bird')
 * @param {string=} data.availabilityStarts the date on which this registration period starts
 * @param {string=} data.availabilityEnds the date on which this registration period ends
 * @param {string=} data.$icon the icon keyword of this registration period
 */
function xRegistrationperiodLegend(frag, data) {
  let date_start = (data.availabilityStarts) ? new Date(data.availabilityStarts) : null
  let date_end   = (data.availabilityEnds  ) ? new Date(data.availabilityEnds  ) : null

  frag.querySelector('i').textContent = data.$icon
  frag.querySelector('b').textContent = data.name
  new xjs.HTMLTimeElement(frag.querySelectorAll('time')[0])
    .dateTime((date_start || new Date()).toISOString())
    .textContent(xjs.Date.format(date_start || new Date(), 'M j'))
  new xjs.HTMLTimeElement(frag.querySelectorAll('time')[1])
    .dateTime((date_end || new Date()).toISOString())
    .textContent(xjs.Date.format(date_end || new Date(), 'M j'))

  if (!date_start) {
    frag.querySelector('slot[name="colon"]').textContent = ' ends '
    frag.querySelectorAll('time')[0].remove()
    frag.querySelector('slot[name="dash"]').remove()
  }
  if (!date_end) {
    frag.querySelector('slot[name="colon"]').textContent = ' begins '
    frag.querySelectorAll('time')[1].remove()
    frag.querySelector('slot[name="dash"]').remove()
  }

  new xjs.HTMLElement(frag.querySelector('small')).trimInner()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-registrationperiod-legend.tpl.html'))
  .setRenderer(xRegistrationperiodLegend)
