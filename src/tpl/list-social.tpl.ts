import * as path from 'path'

import * as xjs from 'extrajs-dom'


/**
 * @summary xListSocial renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.WebPageElement>} data array of link objects
 * @param   {string}                  data.text http://schema.org/text
 * @param   {string}                  data.url  http://schema.org/url
 * @param   {string}                  data.name http://schema.org/name
 * @param   {!Object=} opts additional rendering options
 * @param   {string=} opts.classes classes to add to the list
 */
module.exports.renderer = function xListSocial_renderer(frag, data, opts = {}) {
  new xjs.HTMLUListElement(frag.querySelector('ul'))
    .replaceClassString('{{ listclasses }}', opts.classes)
    .populate(function (f, d, o) {
      new xjs.HTMLAnchorElement(f.querySelector('a'))
        .replaceClassString('{{ name }}', d.name)
        .href(d.url)
      f.querySelector('slot').textContent = d.text
    }, data)
}

module.exports.template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-social.tpl.html'))
