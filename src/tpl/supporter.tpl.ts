import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-supporter.tpl.html'))
  .node

type DataType = sdo.Organization & {
	name: string;
	url : string;
	logo: string;
}

/**
 * Markup for a supporter logo.
 * @param   frag the template content to process
 * @param   data the supporting organization
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.is_sponsor is the supporter a financial sponsor?
 */
function instructions(frag: DocumentFragment, data: DataType, opts = {}): void {
  frag.querySelector('a[itemprop="url"]'    ).href  = data.url
  frag.querySelector('data[itemprop="name"]').value = data.name
  frag.querySelector('img[itemprop="logo"]' ).src   = data.logo
  frag.querySelector('img[itemprop="logo"]' ).alt   = data.name
  if (opts.is_sponsor) frag.querySelector('[itemprop="sponsor"]').setAttribute('itemprop', 'funder')
}

export default new Processor(template, instructions)
