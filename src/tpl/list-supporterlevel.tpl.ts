import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Conference, SupporterLevel} from '../interfaces'
import xSupporterLevel from './supporterlevel.tpl'


interface OptsTypeXListSupporterLevel {
	/** should logo sizing be overridden to `Small`? */
	small?: boolean;
	/** the conference to which these supporter levels belong */
	conference: Conference; // FIXME this should not be required
}

const template: HTMLTemplateElement = xjs.HTMLOListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ol') !).addClass('o-List')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../src/tpl/supporterlevel.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
	})
	.node

function instructions(frag: DocumentFragment, data: SupporterLevel[], opts: OptsTypeXListSupporterLevel): void {
	new xjs.HTMLUListElement(frag.querySelector('ol') !).populate(function (f, d) {
		new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(
			xSupporterLevel.process(d, opts)
		)
	}, data)
}

/**
 * An `<ol>` list of {@link Supporterlevel|supporter levels}.
 */
const xListSupporterLevel: Processor<SupporterLevel[], OptsTypeXListSupporterLevel> = new Processor(template, instructions)
export default xListSupporterLevel
