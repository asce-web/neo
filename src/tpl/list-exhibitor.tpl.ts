import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Exhibitor from './exhibitor.tpl'


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
 * @param   {Array<sdo.Organization>} data array of exhibitors
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag: DocumentFragment, data, opts = {}): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			Exhibitor.process(d)
		)
	}, data)
}

export default new Processor(template, instructions)
