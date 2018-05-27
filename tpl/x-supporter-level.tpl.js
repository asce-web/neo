const path = require('path')

const xjs = require('extrajs-dom')

const xSupporter = require('./x-supporter.tpl.js')


/**
 * @summary A `<section.c-SupporterBlock>` marking up a group of supporter logos belonging to one level.
 * @param {DocumentFragment} frag the template content with which to render
 * @param   {sdo.ItemList}            data                 http://schema.org/ItemList
 * @param   {string}                  data.name            http://schema.org/name
 * @param   {Array<sdo.Organization>} data.itemListElement http://schema.org/itemListElement
 * @param   {!Object=} opts additional rendering options
 * @param   {string=}  opts.classname any classname(s) to add to the `<section>`
 */
function xSupporterLevel_renderer(frag, data, opts = {}) {
  /**
   * Array of supporters in the level.
   * @type {Array<sdo.Organization>}
   */
  let supporters = data.itemListElement.map((supportername) =>
    (this.sponsor || []).find((org) => org.name === supportername)
  )
  new xjs.HTMLElement(frag.querySelector('.c-SupporterBlock')).addClass(opts.classname || '')
  frag.querySelector('.c-SupporterBlock__Hn').textContent = data.name
  new xjs.HTMLUListElement(frag.querySelector('.c-SupporterBlock__List')).populate(supporters, function (f, d, o) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(xSupporter.render(d))
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-supporter-level.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xSupporterLevel_renderer)
