import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'
import {xPersonFullname} from 'aria-patterns'

import {ConfPerson} from '../interfaces'
import Util from '../class/Util.class'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../src/tpl/person-contact.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

function instructions(frag: DocumentFragment, data: ConfPerson): void {
	/**
	 * References to formatting elements.
	 * We want to create these references before removing any elements from the DOM.
	 */
	const formatting = {
		/** Comma after name. */     comma: frag.querySelector('[itemprop="name"] + span') !,
		/** Pipe after job title. */ pipe : frag.querySelector('[itemprop="jobTitle"] + span') !,
	}
  new xjs.Element(frag.querySelector('[itemprop="name"]') !).append(xPersonFullname.process(data))
  frag.querySelector('[itemprop="jobTitle"]') !.textContent = data.jobTitle || ''

	new xjs.HTMLAnchorElement(frag.querySelector('a[itemprop="email"]') as HTMLAnchorElement).exe(function () {
		if (data.email) {
			this.href(`mailto:${data.email}`)
		} else {
			this.attr({
				href: null,
				itemprop: null,
				role: 'none presentation'
			})
		}
	})

  if (data.telephone) {
    new xjs.HTMLAnchorElement(frag.querySelector('a[itemprop="telephone"]') as HTMLAnchorElement)
      .href(`tel:${Util.toURL(data.telephone)}`)
      .textContent(data.telephone)
  } else {
    formatting.pipe.remove()
    frag.querySelector('[itemprop="telephone"]') !.remove()
  }
}

/**
 * Markup for a person and contact information.
 */
const xPersonContact: Processor<ConfPerson, object> = new Processor(template, instructions)
export default xPersonContact
