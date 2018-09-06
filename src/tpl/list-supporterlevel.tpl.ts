import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import supporterlevel_processor from './supporterlevel.tpl'


const template = xjs.HTMLOListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ol')).addClass('o-List')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-supporter-level.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

interface OptsType {
	/** should logo sizing be overridden to `Small`? */
	small?: boolean;
	/** the conference to which these supporter levels belong */
	conference: Conference; // FIXME this should not be required
}

/**
 * An `<ol>` list of {@link Supporterlevel|supporter levels}.
 * @param   frag the template content to process
 * @param   data an array of supporter levels
 * @param   opts additional processing options
 */
function instructions(frag: DocumentFragment, data: sdo.Offer[], opts: OptsType): void {
	new xjs.HTMLUListElement(frag.querySelector('ol')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			supporterlevel_processor.process(d, o)
		)
	}, data, opts, this)
}

export default new Processor(template, instructions)
