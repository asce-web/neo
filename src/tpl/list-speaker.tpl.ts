const xjs = require('extrajs-dom')

const xSpeaker = require('../../tpl/x-speaker.tpl.js')


/**
 * @summary xListSpeaker renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<sdo.Person>} data array of speakers
 * @param   {!Object=} opts additional rendering options
 */
module.exports.renderer = function xListSpeaker_renderer(frag, data, opts = {}) {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			xSpeaker.template.render(xSpeaker.renderer, d)
		)
	}, data)
}

module.exports.template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-ListStacked')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-speaker.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
