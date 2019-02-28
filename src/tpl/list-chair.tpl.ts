import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPerson} from '../interfaces'
import xPersonAffiliation from './person-affiliation.tpl'


const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item c-Chair -mb-h')
			.attr({
				itemprop  : 'organizer',
				itemscope : '',
				itemtype  : 'http://schema.org/Person',
			})
			.innerHTML(`<link rel="import" data-import="template" href="../../src/tpl/person-affiliation.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
	})
	.node

function instructions(frag: DocumentFragment, data: ConfPerson[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f, d) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			xPersonAffiliation.process(d)
		)
	}, data)
}

/**
 * A `<ul>` list of conference chairs.
 */
const xListChair: Processor<ConfPerson[], object> = new Processor(template, instructions)
export default xListChair
