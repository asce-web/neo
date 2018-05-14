const path = require('path')

const xjs = require('extrajs-dom')

const xPersonAffiliation = require('./x-person-affiliation.tpl.js')


/**
 * @summary xListChair renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.Person>} data an array of chairs to list
 * @param   {!Object=} opts additional rendering options
 */
function xListChair_renderer(frag, data, opts = {}) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(xPersonAffiliation.render(d))
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-list-chair.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListChair_renderer)
