import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Conference, Pass} from '../interfaces'
import pass_processor from './pass.tpl'


interface OptsTypeXListPass {
	/** the conference to which this pass belongs */
	conference: Conference; // FIXME this should not be required
}

const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List o-Flex o-ListStacked')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../src/tpl/pass.tpl.html"/>`) // NB relative to dist
		new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
	})
	.node

function instructions(frag: DocumentFragment, data: Pass[], opts: OptsTypeXListPass): void {
	new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f, d) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			pass_processor.process(d, opts)
		)
	}, data, opts)
}

/**
 * A `<ul>` list of {@link Pass|passes}.
 */
const xListPass: Processor<Pass[], OptsTypeXListPass> = new Processor(template, instructions)
export default xListPass
