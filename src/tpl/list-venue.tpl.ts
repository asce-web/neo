import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Venue} from '../interfaces'
import venue_processor from './venue.tpl'


const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List o-Flex o-Flex--even c-Alert')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item o-Flex__Item c-Alert__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../src/tpl/venue.tpl.html"/>`) // NB relative to dist
		new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
	})
	.node

/**
 * A `<ul>` list of {@link Venue|venues}.
 * @param   frag the template content to process
 * @param   data an array of venues
 */
function instructions(frag: DocumentFragment, data: Venue[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f: DocumentFragment, d: Venue) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			venue_processor.process(d)
		)
	}, data)
}

export default new Processor(template, instructions)
