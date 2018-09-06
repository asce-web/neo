import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Supporter} from '../interfaces'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-supporter.tpl.html'))
  .node

interface OptsType {
	/** is the supporter a financial sponsor? */
	is_sponsor?: boolean;
}

/**
 * Markup for a supporter logo.
 * @param   frag the template content to process
 * @param   data the supporting organization
 * @param   opts additional processing options
 */
function instructions(frag: DocumentFragment, data: Supporter, opts: OptsType): void {
  frag.querySelector('a[itemprop="url"]'    ).href  = data.url
  frag.querySelector('data[itemprop="name"]').value = data.name
  frag.querySelector('img[itemprop="logo"]' ).src   = data.logo
  frag.querySelector('img[itemprop="logo"]' ).alt   = data.name
  if (opts.is_sponsor) frag.querySelector('[itemprop="sponsor"]').setAttribute('itemprop', 'funder')
}

export default new Processor(template, instructions)
