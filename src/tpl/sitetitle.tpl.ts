import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfSite} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/sitetitle.tpl.html')) // NB relative to dist
  .node

function instructions(frag: DocumentFragment, data: ConfSite): void {
	frag.querySelector('[itemprop="name"]') !.textContent = data.name
	;(frag.querySelector('a[itemprop="url"]') as HTMLAnchorElement).href = data.url

	new xjs.Element(frag.querySelector('[itemprop="description"]') !).exe(function () {
		if (data.description) this.node.textContent = data.description
		else this.node.remove()
	})
	new xjs.HTMLImageElement(frag.querySelector('img[itemprop="logo"]') as HTMLImageElement).exe(function () {
		if (data.logo) this.src(data.logo)
		else this.node.remove()
	})
}

/**
 * A `<a.c-SiteTitle>` element containing the site logo and title, linking to the home page.
 */
const xSiteTitle: Processor<ConfSite, object> = new Processor(template, instructions)
export default xSiteTitle
