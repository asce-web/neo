import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Supporter} from '../interfaces'


interface OptsTypeXSupporter {
	/** is the supporter a financial sponsor? */
	is_sponsor?: boolean;
}

const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/supporter.tpl.html'))
  .node

function instructions(frag: DocumentFragment, data: Supporter, opts: OptsTypeXSupporter): void {
  ;(frag.querySelector('a[itemprop="url"]'    ) as HTMLAnchorElement).href  = data.url
  ;(frag.querySelector('data[itemprop="name"]') as HTMLDataElement  ).value = data.name
  ;(frag.querySelector('img[itemprop="logo"]' ) as HTMLImageElement ).src   = data.logo
  ;(frag.querySelector('img[itemprop="logo"]' ) as HTMLImageElement ).alt   = data.name
  if (opts.is_sponsor) frag.querySelector('[itemprop="sponsor"]') !.setAttribute('itemprop', 'funder')
}

/**
 * Markup for a supporter logo.
 */
const xSupporter: Processor<Supporter, OptsTypeXSupporter> = new Processor(template, instructions)
export default xSupporter
