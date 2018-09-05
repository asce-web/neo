import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import xExhibitor from './exhibitor.tpl'


const template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-exhibitor.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
	.node

/**
 * @summary xListExhibitor renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<sdo.Organization>} data array of exhibitors
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag, data, opts = {}) {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			xExhibitor.template.render(xExhibitor.renderer, d)
		)
	}, data)
}

export default new Processor(template, instructions)
