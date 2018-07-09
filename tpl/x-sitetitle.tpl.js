const path = require('path')

const xjs = {
  Date: require('extrajs').Date,
  ...require('extrajs-dom'),
}

/**
 * @summary A `<a.c-SiteTitle>` element containing the site logo and title, linking to the home page.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {(sdo.Product&sdo.WebPage)} data http://schema.org/Product & http://schema.org/WebPage
 * @param {string}  data.name        http://schema.org/name
 * @param {string}  data.url         http://schema.org/url
 * @param {string=} data.description http://schema.org/description
 * @param {string=} data.logo        http://schema.org/logo
 * @param   {!Object=} opts additional rendering options
 */
function xSitetitle_renderer(frag, data, opts = {}) {
  frag.querySelector('[itemprop="name"]'       ).textContent = data.name
  frag.querySelector('[itemprop="description"]').textContent = data.description
  frag.querySelector('[itemprop="logo"]'       ).src = data.logo
  frag.querySelector('[itemprop="url"]'        ).href = data.url

  if (!data.description) frag.querySelector('[itemprop="description"]').remove()
  if (!data.logo       ) frag.querySelector('[itemprop="logo"]'       ).remove()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-sitetitle.tpl.html'))
  .setRenderer(xSitetitle_renderer)
