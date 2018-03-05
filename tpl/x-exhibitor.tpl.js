const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary Markup for an exhibitor logo.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Organization} data a JSON object representing the exhibiting organization
 * @param {string} data.name the name of the organization
 * @param {string} data.url the url of the organization
 * @param {string} data.logo the logo url of the organization
 * @param {number} data.$booth the booth number of the exhibitor
 * @param {boolean=} data.$isSponsor whether the exhibitor also happens to be a sponsor
 */
function xExhibitor_renderer(frag, data) {
  frag.querySelector('[itemprop="url"]' ).href        = data.url
  frag.querySelector('[itemprop="name"]').textContent = data.name
  frag.querySelector('[name="booth"]'   ).textContent = data.$booth
  frag.querySelector('[itemprop="logo"]').src         = data.logo
  new xjs.HTMLAnchorElement(frag.querySelector('a'))
    .addClass((data.$isSponsor) ? '-fw-b' : '')
    .trimInner()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-exhibitor.tpl.html'))
  .setRenderer(xExhibitor_renderer)
