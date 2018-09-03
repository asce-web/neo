const xjs = require('extrajs-dom')

const xPersonAffiliation = require('../../tpl/x-person-affiliation.tpl.js')


/**
 * @summary xListChair renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<sdo.Accommodation>} data array of venues
 * @param   {!Object=} opts additional rendering options
 */
module.exports.renderer = function xListChair_renderer(/*this: Conference, */frag, data, opts = {}) {
	new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o = {}) {
		new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
			xPersonAffiliation.template.render(xPersonAffiliation.renderer, d)
		)
	}, data)
}

module.exports.template = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List')
		new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
			.addClass('o-List__Item c-Chair -mb-h')
			.attr({
				itemprop  : 'organizer',
				itemscope : '',
				itemtype  : 'http://schema.org/Person',
			})
			.innerHTML(`<link rel="import" data-import="template" href="../../tpl/x-person-affiliation.tpl.html"/>`)
		new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
	})
