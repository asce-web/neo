const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary xListHighlightbuttons renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {{links:Array, buttonclasses:string=}} data the data to mark up
 * @param {Array<sdo.WebPageElement>} data.links an array of `{url:string, text:string}` objects
 * @param {string=} data.buttonclasses the classes to add to the buttons
 * @param   {!Object=} opts additional rendering options
 */
function xListHighlightbuttons_renderer(frag, data, opts = {}) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data.links, function (f, d, o) {
    new xjs.HTMLAnchorElement(f.querySelector('a'))
      .replaceClassString('{{ buttonclasses }}', data.buttonclasses || '')
      .href       (d.url  || '#1')
      .textContent(d.text || ''  )
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-highlightbuttons.tpl.html'))
  .setRenderer(xListHighlightbuttons_renderer)
