import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Registrationicon from './registrationicon.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-Flex--even c-Alert')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item c-Alert__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-registrationicon.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * A `<ul.c-Alert>` component listing the registration periods in a legend.
 * @param   frag the template content to process
 * @param   data an array of registration periods
 */
function instructions(frag: DocumentFragment, data: sdo.AggregateOffer[]): void {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			Registrationicon.process(d)
		)
	}, data)
}

export default new Processor(template, instructions)
