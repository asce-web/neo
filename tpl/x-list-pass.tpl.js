const path = require('path')

const xjs = require('extrajs-dom')

const xPass = require('./x-pass.tpl.js')


/**
 * @summary xListPass renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {!Object} data the data to fill the template
 * @param {Array<!Object>} data.passes an array of passes to list
 * @param {Conference} data.$conference the conference to which the passes belong
 * @param   {!Object=} opts additional rendering options
 */
function xListPass_renderer(frag, data, opts = {}) {
  new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data.passes, function (f, d, o) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
      xPass.render({ ...d, $conference: data.$conference })
    )
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-list-pass.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
  .setRenderer(xListPass_renderer)
