import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-Flex--even')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item')
			.innerHTML(`<a class="c-Button c-Button--hilite {{ buttonclasses }}" href="{{ url }}">{{ text }}</a>`)
	})
	.node

/**
 * A `<ul>` list of highlighted buttons.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.WebPageElement>} data a list of links
 * @param   {string}                  data.text http://schema.org/text
 * @param   {string}                  data.url  http://schema.org/url
 * @param   {!Object=} opts additional rendering options
 * @param   {string=} opts.buttonclasses classes to add to each link
 */
function instructions(frag, data, opts = {}): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLAnchorElement(f.querySelector('a'))
			.replaceClassString('{{ buttonclasses }}', o.buttonclasses)
			.href       (d.url  || '#1')
			.textContent(d.text || ''  )
	}, data, { buttonclasses: opts.buttonclasses })
}

export default new Processor(template, instructions)
