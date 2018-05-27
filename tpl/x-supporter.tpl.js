const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary Markup for a supporter logo.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Organization} data http://schema.org/Organization
 * @param {string} data.name http://schema.org/name
 * @param {string} data.url  http://schema.org/url
 * @param {string} data.logo http://schema.org/logo
 * @param   {!Object=} opts additional rendering options
 */
function xSupporter_renderer(frag, data, opts = {}) {
  frag.querySelector('a[itemprop="url"]'    ).href  = data.url
  frag.querySelector('data[itemprop="name"]').value = data.name
  frag.querySelector('img[itemprop="logo"]' ).src   = data.logo
  frag.querySelector('img[itemprop="logo"]' ).alt   = data.name
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-supporter.tpl.html'))
  .setRenderer(xSupporter_renderer)
