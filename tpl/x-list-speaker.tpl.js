const path = require('path')

const xjs = require('extrajs-dom')

const xSpeaker = require('./x-speaker.tpl.js')


/**
 * @summary xListSpeaker renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.Person>} data an array of speakers to list
 */
function xListSpeaker_renderer(frag, data) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
      xSpeaker.render(d)
    )
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-list-speaker.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListSpeaker_renderer)
