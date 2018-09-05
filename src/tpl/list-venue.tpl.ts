import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import xVenue from './venue.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-Flex--even c-Alert')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item c-Alert__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-venue.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * @summary xListVenue renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<sdo.Accommodation>} data array of venues
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag, data, opts = {}) {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			xVenue.template.render(xVenue.renderer, d)
		)
	}, data)
}

export default new Processor(template, instructions)
