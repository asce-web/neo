const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary xLinklist renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.WebPageElement>} data an array of `{url:string, text:string}` objects
 */
function xLinklist_renderer(frag, data) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d) {
    f.querySelector('a'   ).href        = d.url  || '#1'
    f.querySelector('slot').textContent = d.text || ''
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-linklist.tpl.html'))
  .setRenderer(xLinklist_renderer)
