const path = require('path')

const xjs = require('extrajs-dom')

/**
 * @summary A list of highlight buttons.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {{links:Array, buttonclasses:string=}} data the data to mark up
 * @param {Array<xjs.HTMLElement>} data.links an array of links TODO `sdo.WebPageElement: {url:string, text:string}`
 * @param {string=} data.buttonclasses the classes to add to the buttons
 */
function xHighlightButtons_renderer(frag, data) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data.links, function (f, d) {
    new xjs.HTMLAnchorElement(f.querySelector('a'))
      .replaceClassString('{{ buttonclasses }}', data.buttonclasses || '')
      .href(d.attr('href') || '#1') // TODO d.url
      .textContent(d.textContent() || '') // TODO d.text
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-highlight-buttons.tpl.html'))
  .setRenderer(xHighlightButtons_renderer)
