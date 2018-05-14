const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary xListHighlightbuttons renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.WebPageElement>} data an array of `{url:string, text:string}` objects
 * @param   {!Object=} opts additional rendering options
 * @param   {string=} opts.buttonclasses the classes to add to the buttons
 */
function xListHighlightbuttons_renderer(frag, data, opts = {}) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d) {
    new xjs.HTMLAnchorElement(f.querySelector('a'))
      .replaceClassString('{{ buttonclasses }}', opts.buttonclasses || '')
      .href       (d.url  || '#1')
      .textContent(d.text || ''  )
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-highlightbuttons.tpl.html'))
  .setRenderer(xListHighlightbuttons_renderer)
