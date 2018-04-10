const path = require('path')

const xjs = {
  Date: require('extrajs').Date,
  ...require('extrajs-dom'),
}

/**
 * @summary xListSocial renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {!Object} data data to fill in the template
 * @param {Array<sdo.WebPageElement>} data.links array of `{url:string, text:string}` objects
 * @param {string=} data.classes classes to add to the list
 */
function xListSocial_renderer(frag, data) {
  new xjs.HTMLUListElement(frag.querySelector('ul'))
    .replaceClassString('{{ listclasses }}', data.classes)
    .populate(data.links, function (f, d) {
      new xjs.HTMLAnchorElement(f.querySelector('a'))
        .replaceClassString('{{ name }}', d.name)
        .href(d.url  || '#1')
      f.querySelector('slot').textContent = d.text || ''
    })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-social.tpl.html'))
  .setRenderer(xListSocial_renderer)
