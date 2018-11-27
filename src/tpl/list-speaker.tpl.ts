import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPerson} from '../interfaces'
import speaker_processor from './speaker.tpl'


const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List o-Flex o-ListStacked')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../src/tpl/speaker.tpl.html"/>`) // NB relative to dist
		new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
	})
	.node

function instructions(frag: DocumentFragment, data: ConfPerson[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f: DocumentFragment, d: ConfPerson) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			speaker_processor.process(d)
		)
	}, data)
}

/**
 * A `<ul>` list of {@link Speaker|speakers}.
 */
const xListSpeaker: Processor<ConfPerson[], object> = new Processor(template, instructions)
export default xListSpeaker
