const path = require('path')

const xjs = require('extrajs-dom')

const xSupporterLevel = require('./x-supporter-level.tpl.js')


/**
 * @summary xListSupporterLevel renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param   {sdo.ItemList}  data                 http://schema.org/ItemList
 * @param   {Array<string>} data.itemListElement http://schema.org/itemListElement : the list of supporter levels to display, in the correct order
 * @param   {string=}       data.$logoSize       if given, either `Small`, `Medium`, or `Large`; the logo size to render
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.small should logo sizing be overridden to `Small`?
 */
function xListSupporterLevel_renderer(frag, data, opts = {}) {
  /**
   * Array of supporter levels to render.
   * @type {Array<sdo.ItemList>}
   */
  let supporter_levels = data.itemListElement.map((supporterlevelname) =>
    (this.$supporterLevels || []).find((itemlist) => itemlist.name === supporterlevelname)
  )
  new xjs.HTMLOListElement(frag.querySelector('ol')).populate(supporter_levels, function (f, d, o) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
      xSupporterLevel.render(d, this, {
        classname: ({
          'Small' : 'c-SupporterBlock--sml',
          'Medium': 'c-SupporterBlock--med',
          'Large' : 'c-SupporterBlock--lrg',
        })[(opts.small) ? 'Small' : (data.$logoSize || 'Small')],
      })
    )
  }, this)
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-supporter-level.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListSupporterLevel_renderer)
