import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfSite} from '../interfaces'

const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-sitetitle.tpl.html'))
  .node

/**
 * A `<a.c-SiteTitle>` element containing the site logo and title, linking to the home page.
 * @param   frag the template content to process
 * @param   data the webpage with possible description and logo
 */
function instructions(frag: DocumentFragment, data: ConfSite): void {
  frag.querySelector('[itemprop="name"]'       ) !.textContent = data.name
  ;(frag.querySelector('a[itemprop="url"]'   ) as HTMLAnchorElement).href = data.url

	// REVIEW control flow
	if (data.description)  frag.querySelector('[itemprop="description"]') !.textContent = data.description
	else                   frag.querySelector('[itemprop="description"]') !.remove()
	if (data.logo       ) (frag.querySelector('img[itemprop="logo"]'    ) as HTMLImageElement ).src = data.logo
	else                   frag.querySelector('img[itemprop="logo"]'    ) !.remove()
}

export default new Processor(template, instructions)
