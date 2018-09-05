import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Speaker from './speaker.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-ListStacked')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-speaker.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * A `<ul>` list of {@link Speaker|speakers}.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<sdo.Person>} data array of speakers
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag, data, opts = {}): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			Speaker.process(d)
		)
	}, data)
}

export default new Processor(template, instructions)
