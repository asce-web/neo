const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary Markup for a venue.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Place} data a JSON object representing the venue
 * @param {string} data.name the name of this place
 * @param {string} data.description the label or title for the venue
 * @param {sdo.PostalAddress} data.address the physical address of this place
 * @param {string=} data.url the url of this place
 * @param {string=} data.logo the logo url for this place
 * @param {string=} data.telephone the telephone number of this place
 * @param {!Object=} data.$cta a call-to-action link with a url and text
 * @param {string=}  data.$cta.url the url of the call-to-action
 * @param {string=}  data.$cta.text the text of the call-to-action
 */
function xVenue_renderer(frag, data) {
  frag.querySelector('[itemprop="name"]'     ).textContent = data.name
  frag.querySelector('[itemprop="streetAddress"]'  ).textContent = data.address.streetAddress
  frag.querySelector('[itemprop="addressLocality"]').textContent = data.address.addressLocality
  frag.querySelector('[itemprop="addressRegion"]'  ).textContent = data.address.addressRegion
  frag.querySelector('[itemprop="postalCode"]'     ).textContent = data.address.postalCode

  if (data.url) {
    frag.querySelector('[itemprop="url"]').href = data.url
  } else {
    new xjs.HTMLAnchorElement(frag.querySelector('a')).attr({
      href: null,
      itemprop: null,
    })
  }

  if (data.telephone) frag.querySelector('[itemprop="telephone"]').textContent = data.telephone
  else frag.querySelector('[itemprop="telephone"]').remove()

  if (data.addressCountry) frag.querySelector('[itemprop="addressCountry"]' ).textContent = data.address.addressCountry
  else frag.querySelector('[itemprop="addressCountry"]').remove()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-venue.tpl.html'))
  .setRenderer(xVenue_renderer)
