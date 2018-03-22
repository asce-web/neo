const path = require('path')

const xjs = {
  Date: require('extrajs').Date,
  ...require('extrajs-dom'),
}

/**
 * @summary xListRegistrationicon renderer.
 * @description A `<ul>` element listing the registration periods in a legend.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.AggregateOffer>} data array of registration periods, each with:
 * @param {string} data.name the name of the registration period (e.g., 'Early Bird')
 * @param {string=} data.availabilityStarts the date on which this registration period starts
 * @param {string=} data.availabilityEnds the date on which this registration period ends
 * @param {string=} data.$icon the icon keyword of this registration period
 */
function xListRegistrationicon_renderer(frag, data) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d) {
    let date_start = (d.availabilityStarts) ? new Date(d.availabilityStarts) : null
    let date_end   = (d.availabilityEnds  ) ? new Date(d.availabilityEnds  ) : null

    f.querySelector('i').textContent = d.$icon
    f.querySelector('b').textContent = d.name
    new xjs.HTMLTimeElement(f.querySelectorAll('time')[0])
      .dateTime((date_start || new Date()).toISOString())
      .textContent(xjs.Date.format(date_start || new Date(), 'M j'))
    new xjs.HTMLTimeElement(f.querySelectorAll('time')[1])
      .dateTime((date_end || new Date()).toISOString())
      .textContent(xjs.Date.format(date_end || new Date(), 'M j'))

    if (!date_start) {
      f.querySelector('slot[name="colon"]').textContent = ' ends '
      f.querySelectorAll('time')[0].remove()
      f.querySelector('slot[name="dash"]').remove()
    }
    if (!date_end) {
      f.querySelector('slot[name="colon"]').textContent = ' begins '
      f.querySelectorAll('time')[1].remove()
      f.querySelector('slot[name="dash"]').remove()
    }

    new xjs.HTMLElement(f.querySelector('small')).trimInner()
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-registrationicon.tpl.html'))
  .setRenderer(xListRegistrationicon_renderer)
