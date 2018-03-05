const path = require('path')

const xjs = {
  Date: require('extrajs').Date,
  ...require('extrajs-dom'),
}

/**
 * @summary A `<ul>` element listing the registration periods in a legend.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.AggregateOffer>} data array of registration periods, each with:
 * @param {string} data.name the site title (name of the website)
 * @param {string=} data.description the site slogan
 * @param {string} data.url the site url
 * @param {string=} data.logo the site logo
 */
function xSitetitle(frag, data) {
  frag.querySelector('[itemprop="name"]'       ).textContent = data.name
  frag.querySelector('[itemprop="description"]').textContent = data.description
  frag.querySelector('[itemprop="logo"]'       ).src = data.logo
  frag.querySelector('[itemprop="url"]'        ).href = data.url

  if (!data.description) frag.querySelector('[itemprop="description"]').remove()
  if (!data.logo       ) frag.querySelector('[itemprop="logo"]'       ).remove()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-sitetitle.tpl.html'))
  .setRenderer(xSitetitle)
