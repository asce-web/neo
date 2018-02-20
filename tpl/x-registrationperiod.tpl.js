const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary A `<section.c-Pass__Period>` subcomponent marking up this period’s info.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {AggregateOffer} data a JSON object representing a registration period
 * @param {string} data.name the name of the registration period (e.g., 'Early Bird')
 * @param {string=} data.availabilityStarts the date on which this registration period starts
 * @param {string=} data.availabilityEnds the date on which this registration period ends
 * @param {string=} data.$icon the icon keyword of this registration period
 * @param {Pass} data.$pass any pass in which to place this registration period markup
 * @param {boolean=} data.$is_body `true` if this period is to be placed in the body and not the footer
 */
function xRegistrationperiod(frag, data) {
  let date_start = (data.availabilityStarts) ? new Date(data.availabilityStarts) : null
  let date_end   = (data.availabilityEnds  ) ? new Date(data.availabilityEnds  ) : null

  new xjs.HTMLElement(frag.querySelector('.c-Pass__Period')).replaceClassString('{{ is_body }}', (!data.$is_body) ? 'o-Flex__Item' : '')
  frag.querySelector('slot[name="offer-name"]'        ).textContent = data.name
  frag.querySelector('slot[name="pass-name"]'         ).textContent = `${data.$pass.name}: `
  frag.querySelector('[itemprop="offerCount"]'        ).content = data.$pass.getAttendeeTypesAll().length
  frag.querySelector('[itemprop="availabilityStarts"]').content = (date_start || new Date()).toISOString()
  frag.querySelector('[itemprop="availabilityEnds"]'  ).content = (date_end   || new Date()).toISOString()
  if (!date_start) frag.querySelector('[itemprop="availabilityStarts"]').remove()
  if (!date_end  ) frag.querySelector('[itemprop="availabilityEnds"]'  ).remove()

  frag.querySelector('dl').innerHTML = data.$pass.getAttendeeTypesAll().map((att_type) =>
    att_type.view.pass(42.87) // TODO price is 42 for now
  ).join('')
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-registrationperiod.tpl.html'))
  .setRenderer(xRegistrationperiod)
