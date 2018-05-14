const path = require('path')

const xjs = require('extrajs-dom')

const xPass = require('./x-pass.tpl.js')


/**
 * @summary xListPass renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param   {Array<!Object>} data an array of passes to list
 * @param   {!Object=} opts additional rendering options
 * @param   {Conference} opts.conference the conference to which the passes belong
 */
function xListPass_renderer(frag, data, opts = {}) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
      xPass.render(d, null, { conference: opts.conference })
    )
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-list-pass.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListPass_renderer)
