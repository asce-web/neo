import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Hyperlink} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List c-LinkList')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item c-LinkList__Item')
			.innerHTML(`
				<a class="c-LinkList__Link" href="{{ url }}">
					<i class="halflings halflings-circle-arrow-right" aria-hidden="true"></i>
					<slot>{{ text }}</slot>
				</a>
			`)
	})
	.node

function instructions(frag: DocumentFragment, data: Hyperlink[]) {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f, d) {
		f.querySelector('a'   ) !.href        = d.url
		f.querySelector('slot') !.textContent = d.text
	}, data)
}

/**
 * A list of hyperlinks.
 */
const xListLink: Processor<Hyperlink[], object> = new Processor(template, instructions)
export default xListLink
