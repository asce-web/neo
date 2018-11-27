import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'
import {xAddress} from 'aria-patterns'

import {Venue} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/venue.tpl.html')) // NB relative to dist
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * A `<section>` element marking up a venue.
 * @param   frag the template content to process
 * @param   data a venue for a conference
 */
function instructions(frag: DocumentFragment, data: Venue): void {
  frag.querySelector('[itemprop="description"]') !.textContent = data.description
  frag.querySelector('[itemprop="name"]')        !.textContent = data.name

  new xjs.Element(frag.querySelector('[itemprop="address"]') !).append(xAddress.process({
    ...data.address,
  }))

	new xjs.HTMLImageElement(frag.querySelector('img[itemprop="photo"]') as HTMLImageElement).exe(function () {
		if (data.photo) this.src(data.photo.url)
		else this.node.remove()
	})
	new xjs.HTMLAnchorElement(frag.querySelector('a[itemprop="telephone"]') as HTMLAnchorElement).exe(function () {
		if (data.telephone) this.href(`tel:${data.telephone}`).textContent(data.telephone)
		else this.node.remove()
	})
	new xjs.HTMLAnchorElement(frag.querySelector('a[itemprop="url"]') as HTMLAnchorElement).exe(function () {
		if (data.url) {
			this.href(data.url)
		} else {
			this.attr({
				href: null,
				itemprop: null,
				role: 'none presentation'
			})
		}
	})
}

export default new Processor(template, instructions)
