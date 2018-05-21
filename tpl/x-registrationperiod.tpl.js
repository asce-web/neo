const path = require('path')

const xjs = require('extrajs-dom')

const xAttendeetype = require('./x-attendeetype.tpl.js')


/**
 * @summary A `<section.c-Pass__Period>` subcomponent marking up this period’s info.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.AggregateOffer} data a JSON object representing a registration period
 * @param {string} data.name the name of the registration period (e.g., 'Early Bird')
 * @param {string=} data.availabilityStarts the date on which this registration period starts
 * @param {string=} data.availabilityEnds the date on which this registration period ends
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.is_body `true` if this period is to be placed in the body and not the footer
 * @param   {!Object} opts.pass any pass in which to place this registration period markup
 * @param   {string} opts.pass.name the name or type of the pass
 * @param   {Array<string>=} opts.pass.$attendeeTypes types of attendees that can purchase this pass
 *                                             (usually based on membership)
 */
function xRegistrationperiod_renderer(frag, data, opts = {}) {
  let date_start = (data.availabilityStarts) ? new Date(data.availabilityStarts) : null
  let date_end   = (data.availabilityEnds  ) ? new Date(data.availabilityEnds  ) : null

  new xjs.HTMLElement(frag.querySelector('.c-Pass__Period')).replaceClassString('{{ is_body }}', (!opts.is_body) ? 'o-Flex__Item' : '')
  frag.querySelector('slot[name="offer-name"]'        ).textContent = data.name
  frag.querySelector('slot[name="pass-name"]'         ).textContent = `${opts.pass.name}: `
  frag.querySelector('[itemprop="offerCount"]'        ).content = opts.pass.$attendeeTypes.length

  if (date_start)  frag.querySelector('[itemprop="availabilityStarts"]').content = date_start.toISOString()
  else             frag.querySelector('[itemprop="availabilityStarts"]').remove()
  if (date_end  )  frag.querySelector('[itemprop="availabilityEnds"]'  ).content = date_end.toISOString()
  else             frag.querySelector('[itemprop="availabilityEnds"]'  ).remove()

  frag.querySelector('dl').append(
    ...opts.pass.$attendeeTypes.map((att_type) =>
      xAttendeetype.render({ "@type": "Offer", name: att_type.name, price: 42.87 }) // TODO price is 42 for now
    )
  )
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-registrationperiod.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .setRenderer(xRegistrationperiod_renderer)
