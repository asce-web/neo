import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Exhibitor} from '../interfaces'
import exhibitor_processor from './exhibitor.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-exhibitor.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * A `<ul>` list of exhibitors.
 * @param   frag the template content to process
 * @param   data an array of exhibitors
 */
function instructions(frag: DocumentFragment, data: Exhibitor[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			exhibitor_processor.process(d)
		)
	}, data)
}

export default new Processor(template, instructions)
