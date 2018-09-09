import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPerson} from '../interfaces'

const {xPersonFullname} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../tpl/x-person-contact.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * Markup for a person and contact information.
 * @param   frag the template content to process
 * @param   data a person that has a job title
 */
function instructions(frag: DocumentFragment, data: ConfPerson): void {
	/**
	 * References to formatting elements.
	 * We want to create these references before removing any elements from the DOM.
	 */
	const formatting = {
		/** Comma after name. */     comma: frag.querySelector('[itemprop="name"] + span') !,
		/** Pipe after job title. */ pipe : frag.querySelector('[itemprop="jobTitle"] + span') !,
	}
  new xjs.Element(frag.querySelector('[itemprop="name"]') !).append(xPersonFullname.render(data))
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
      .href(data.telephone)
      .textContent(data.telephone)
  } else {
    formatting.pipe.remove()
    frag.querySelector('[itemprop="telephone"]') !.remove()
  }
}

export default new Processor(template, instructions)
