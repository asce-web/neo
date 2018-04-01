const path = require('path')

const xjs = require('extrajs-dom')

const xVenue = require('./x-venue.tpl.js')


/**
 * @summary xListVenue renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.Accommodation>} data an array of venues to list
 */
function xListVenue_renderer(frag, data) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(xVenue.render(d))
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-list-venue.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListVenue_renderer)
