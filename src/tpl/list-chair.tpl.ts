import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPerson} from '../interfaces'
import person_affiliation_processor from './person-affiliation.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item c-Chair -mb-h')
			.attr({
				itemprop  : 'organizer',
				itemscope : '',
				itemtype  : 'http://schema.org/Person',
			})
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-person-affiliation.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * A `<ul>` list of conference chairs.
 * @param   frag the template content to process
 * @param   data an array of conference chairs
 */
function instructions(frag: DocumentFragment, data: ConfPerson[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f: DocumentFragment, d: ConfPerson) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			person_affiliation_processor.process(d)
		)
	}, data)
}

export default new Processor(template, instructions)
