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

	new xjs.Element(frag.querySelector('[itemprop="description"]') !).exe(function () {
		if (data.description) this.node.textContent = data.description
		else this.node.remove()
	})
	new xjs.HTMLImageElement(frag.querySelector('img[itemprop="logo"]') as HTMLImageElement).exe(function () {
		if (data.logo) this.src(data.logo)
		else this.node.remove()
	})
}

export default new Processor(template, instructions)
