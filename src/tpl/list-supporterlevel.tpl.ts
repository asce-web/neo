const xjs = require('extrajs-dom')

const xSupporterLevel = require('../../tpl/x-supporter-level.tpl.js')


/**
 * @summary xListSupporterLevel renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<sdo.Offer>} data array of supporter levels
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.small should logo sizing be overridden to `Small`?
 * @param   {Conference} opts.conference the conference containing this list
 */
module.exports.renderer = function xListSupporterLevel_renderer(frag, data, opts = {}) {
	new xjs.HTMLUListElement(frag.querySelector('ol')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			xSupporterLevel.template.render(xSupporterLevel.renderer, d, o)
		)
	}, data, opts, this)
}

module.exports.template = xjs.HTMLOListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ol')).addClass('o-List')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item')
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-supporter-level.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
