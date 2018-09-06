import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-exhibitor.tpl.html'))
  .node

type DataType = sdo.Organization & {
	name: string;
	url : string;
	logo: string;
	/** the booth number of the exhibitor */
	$booth: number;
	/** does the exhibitor also happen to be a sponsor? */
	$isSponsor?: boolean;
}

/**
 * Markup for an exhibitor logo.
 * @param   frag the template content to process
 * @param   data the exhibiting organization
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag: DocumentFragment, data: DataType, opts = {}): void {
  frag.querySelector('a[itemprop="url"]'   ).href        = data.url
  frag.querySelector('[itemprop="name"]'   ).textContent = data.name
  frag.querySelector('slot[name="booth"]'  ).textContent = data.$booth
  frag.querySelector('img[itemprop="logo"]').src         = data.logo

  if (!data.$isSponsor) {
    frag.querySelector('strong').remove()
    new xjs.HTMLAnchorElement(frag.querySelector('a')).removeClass('-fw-b')
  }
}

export default new Processor(template, instructions)
