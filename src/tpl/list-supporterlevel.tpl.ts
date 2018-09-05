import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Supporterlevel from './supporterlevel.tpl'


const template = xjs.HTMLOListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ol')).addClass('o-List')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-supporter-level.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * An `<ol>` list of {@link Supporterlevel|supporter levels}.
 * @param   frag the template content to process
 * @param   {Array<sdo.Offer>} data array of supporter levels
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.small should logo sizing be overridden to `Small`?
 * @param   {Conference} opts.conference the conference containing this list
 */
function instructions(frag: DocumentFragment, data, opts = {}): void {
	new xjs.HTMLUListElement(frag.querySelector('ol')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			Supporterlevel.process(d, o)
		)
	}, data, opts, this)
}

export default new Processor(template, instructions)
