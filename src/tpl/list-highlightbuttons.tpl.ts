import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Hyperlink} from '../interfaces'


interface OptsType {
	/** additional class(es) to add to each link */
	buttonclasses?: string;
}

const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List o-Flex o-Flex--even')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item o-Flex__Item')
			.innerHTML(`<a class="c-Button c-Button--hilite {{ buttonclasses }}" href="{{ url }}">{{ text }}</a>`)
	})
	.node

function instructions(frag: DocumentFragment, data: Hyperlink[], opts: OptsType): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f: DocumentFragment, d: Hyperlink) {
		new xjs.HTMLAnchorElement(f.querySelector('a') !)
			.replaceClassString('{{ buttonclasses }}', opts.buttonclasses || '')
			.href       (d.url  || '#1')
			.textContent(d.text || ''  )
	}, data)
}

/**
 * A `<ul>` list of highlighted buttons.
 */
const xListHighlightButton: Processor<Hyperlink[], OptsType> = new Processor(template, instructions)
export default xListHighlightButton
