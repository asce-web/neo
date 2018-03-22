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

    let times = Array.from(f.querySelectorAll('time'))
    let colon = f.querySelector('slot[name="colon"]')
    let dash = f.querySelector('slot[name="dash"]')
    if (date_start) {
      new xjs.HTMLTimeElement(times[0])
        .dateTime(date_start.toISOString())
        .textContent(xjs.Date.format(date_start, 'M j'))
    } else {
      colon.textContent = ' ends '
      times[0].remove()
      dash.remove()
    }
    if (date_end) {
      new xjs.HTMLTimeElement(times[1])
        .dateTime(date_end.toISOString())
        .textContent(xjs.Date.format(date_end, 'M j'))
    } else {
      f.querySelector('slot[name="colon"]').textContent = ' begins '
      dash.remove()
      times[1].remove()
    }

    new xjs.HTMLElement(f.querySelector('small')).trimInner()
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-registrationicon.tpl.html'))
  .setRenderer(xListRegistrationicon_renderer)
