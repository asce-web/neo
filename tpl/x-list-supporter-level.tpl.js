const path = require('path')

const xjs = require('extrajs-dom')

const xSupporterLevel = require('./x-supporter-level.tpl.js')


/**
 * @summary xListSupporterLevel renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param   {Array<sdo.Offer>} data the list of supporter levels to display, in the correct order
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.small should logo sizing be overridden to `Small`?
 */
function xListSupporterLevel_renderer(frag, data, opts = {}) {
  new xjs.HTMLOListElement(frag.querySelector('ol')).populate(data, function (f, d, o) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
      xSupporterLevel.render(d, this, { small: o.small })
    )
  }, this, opts)
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-list-supporter-level.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListSupporterLevel_renderer)
