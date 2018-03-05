const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary Markup for a supporter logo.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Organization} data a JSON object representing the supporting organization
 * @param {string} data.name the name of the organization
 * @param {string} data.url the url of the organization
 * @param {string} data.logo the logo url of the organization
 * @param {string=} data.$level the level of the supporting organization
 */
function xSupporter(frag, data) {
  frag.querySelector('[itemprop="url"]' ).href  = data.url
  frag.querySelector('[itemprop="name"]').value = data.name
  frag.querySelector('[itemprop="logo"]').src   = data.logo
  frag.querySelector('[itemprop="logo"]').alt   = data.name
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-supporter.tpl.html'))
  .setRenderer(xSupporter)
