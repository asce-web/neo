import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Exhibitor} from '../interfaces'
import exhibitor_processor from './exhibitor.tpl'


const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.innerHTML(`<link rel="import" data-import="template" href="../../src/tpl/exhibitor.tpl.html"/>`) // NB relative to dist
		new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
	})
	.node

function instructions(frag: DocumentFragment, data: Exhibitor[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f: DocumentFragment, d: Exhibitor) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			exhibitor_processor.process(d)
		)
	}, data)
}

/**
 * A `<ul>` list of exhibitors.
 */
const xListExhibitor: Processor<Exhibitor[], object> = new Processor(template, instructions)
export default xListExhibitor
