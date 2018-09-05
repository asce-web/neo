import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-supporter.tpl.html'))
  .node

/**
 * @summary Markup for a supporter logo.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Organization} data http://schema.org/Organization
 * @param {string} data.name http://schema.org/name
 * @param {string} data.url  http://schema.org/url
 * @param {string} data.logo http://schema.org/logo
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.is_sponsor is the supporter a financial sponsor?
 */
function instructions(frag, data, opts = {}) {
  frag.querySelector('a[itemprop="url"]'    ).href  = data.url
  frag.querySelector('data[itemprop="name"]').value = data.name
  frag.querySelector('img[itemprop="logo"]' ).src   = data.logo
  frag.querySelector('img[itemprop="logo"]' ).alt   = data.name
  if (opts.is_sponsor) frag.querySelector('[itemprop="sponsor"]').setAttribute('itemprop', 'funder')
}

export default new Processor(template, instructions)
