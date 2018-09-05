import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-sitetitle.tpl.html'))
  .node

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
function instructions(frag, data, opts = {}) {
  frag.querySelector('[itemprop="name"]'       ).textContent = data.name
  frag.querySelector('[itemprop="description"]').textContent = data.description
  frag.querySelector('[itemprop="logo"]'       ).src = data.logo
  frag.querySelector('[itemprop="url"]'        ).href = data.url

  if (!data.description) frag.querySelector('[itemprop="description"]').remove()
  if (!data.logo       ) frag.querySelector('[itemprop="logo"]'       ).remove()
}

export default new Processor(template, instructions)
