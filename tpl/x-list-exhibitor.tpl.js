const path = require('path')

const xjs = require('extrajs-dom')

const xExhibitor = require('./x-exhibitor.tpl.js')


/**
 * @summary xListExhibitor renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.Organizations>} data list of exhibitors to display
 */
function xListExhibitor_renderer(frag, data) {
  new xjs.HTMLOListElement(frag.querySelector('ul')).populate(data, function (f, d) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(xExhibitor.render(d))
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-exhibitor.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListExhibitor_renderer)
