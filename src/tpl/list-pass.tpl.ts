import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Pass from './pass.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-ListStacked')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-pass.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * A `<ul>` list of {@link Pass|passes}.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<!Object>} data array of passes
 * @param   {!Object=} opts additional rendering options
 * @param   {Conference} opts.conference the conference containing this pass
 */
function instructions(frag, data, opts = {}): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			Pass.process(d, o)
		)
	}, data, opts, this)
}

export default new Processor(template, instructions)
