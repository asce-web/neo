import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Venue} from '../interfaces'
import xVenue from './venue.tpl'


const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List o-Flex o-Flex--even c-Alert')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item o-Flex__Item c-Alert__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../src/tpl/venue.tpl.html"/>`) // NB relative to dist
		new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
	})
	.node

function instructions(frag: DocumentFragment, data: Venue[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f, d) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			xVenue.process(d)
		)
	}, data)
}

/**
 * A `<ul>` list of {@link Venue|venues}.
 */
const xListVenue: Processor<Venue[], object> = new Processor(template, instructions)
export default xListVenue
