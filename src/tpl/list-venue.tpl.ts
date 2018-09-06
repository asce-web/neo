import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Venue from './venue.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-Flex--even c-Alert')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item c-Alert__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-venue.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * A `<ul>` list of {@link Venue|venues}.
 * @param   frag the template content to process
 * @param   data an array of venues
 */
function instructions(frag: DocumentFragment, data: sdo.Accommodation[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			Venue.process(d)
		)
	}, data)
}

export default new Processor(template, instructions)
