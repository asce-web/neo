const xjs = require('extrajs-dom')

const xPass = require('../../tpl/x-pass.tpl.js')


/**
 * @summary xListPass renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<!Object>} data array of passes
 * @param   {!Object=} opts additional rendering options
 */
module.exports.renderer = function xListPass_renderer(/*this: Conference, */frag, data, opts = {}) {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			xPass.template.render(xPass.renderer, d, { conference: this })
		)
	}, data, {}, this)
}

module.exports.template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-ListStacked')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-pass.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
