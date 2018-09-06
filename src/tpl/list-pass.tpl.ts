import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Conference, Pass} from '../interfaces'
import pass_processor from './pass.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-ListStacked')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-pass.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

interface OptsType {
	/** the conference to which this pass belongs */
	conference: Conference; // FIXME this should not be required
}

/**
 * A `<ul>` list of {@link Pass|passes}.
 * @param   frag the template content to process
 * @param   data an array of passes
 * @param   opts additional processing options
 */
function instructions(frag: DocumentFragment, data: Pass[], opts: OptsType): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			pass_processor.process(d, o)
		)
	}, data, opts, this)
}

export default new Processor(template, instructions)
