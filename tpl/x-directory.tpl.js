const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

/**
 * @summary xDirectory renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {sdo.WebPage}                      data         http://schema.org/WebPage
 * @param   {(sdo.WebPage|Array<sdo.WebPage>)} data.hasPart http://schema.org/hasPart
 * @param   {!Object=} opts additional rendering options
 * @param   {integer=} [opts.depth=Infinity] number of nested directory levels
 * @param   {integer=} options.start which subpage to start at
 * @param   {integer=} options.end which subpage to end at
 * @param   {?Object<string>=} opts.classes group set of css class configurations
 * @param   {string=}          opts.classes.list list classes (`<ol>`)
 * @param   {string=}          opts.classes.item item classes (`<li>`)
 * @param   {string=}          opts.classes.link link classes (`<a>`)
 * @param   {string=}          opts.classes.icon classes for page icon
 * @param   {string=}          opts.classes.expand classes for `expand_more` icon
 * @param   {!Object=} opts.options configurations for nested outlines; specs identical to `opts`
*/
function xDirectory_renderer(frag, data, opts = {}) {
  const Util = require('../class/Util.class.js')
  let subpages = (xjs.Object.typeOf(data.hasPart) === 'array' ) ? data.hasPart : [data.hasPart]
  let depth    = (xjs.Object.typeOf(opts.depth)   === 'number') ? opts.depth   : Infinity
  new xjs.HTMLOListElement(frag.querySelector('ol'))
    .replaceClassString('{{ classes.list }}', opts.classes && opts.classes.list || '')
    .populate(subpages, function (f, d, o = {}) {
      new xjs.HTMLLIElement(f.querySelector('[itemprop="hasPart"]')).replaceClassString('{{ classes.item }}', opts.classes && opts.classes.item || '')
      new xjs.HTMLAnchorElement(f.querySelector('[itemprop="url"]'))
        .replaceClassString('{{ classes.link }}', opts.classes && opts.classes.link || '')
        .href(d.url()) // TODO don’t use Page#url()
      f.querySelector('slot[itemprop="name"]').textContent = d.name() // TODO don’t use Page#name()

      let icons = [...f.querySelectorAll('i.material-icons')]
      if (xjs.Object.typeOf(opts.classes && opts.classes.icon) === 'string') {
        new xjs.HTMLElement(icons[0])
          .replaceClassString('{{ classes.icon }}', opts.classes && opts.classes.icon || '')
          .textContent(d.getIcon()) // TODO don’t use ConfPage#getIcon()
      } else {
        icons[0].remove()
      }
      if (xjs.Object.typeOf(opts.classes && opts.classes.expand) === 'string' && d.findAll().length) { // TODO don’t use Page#findAll
        new xjs.HTMLElement(icons[1])
          .replaceClassString('{{ classes.expand }}', opts.classes && opts.classes.expand || '')
      } else {
        icons[1].remove()
      }

      if (d.findAll().length && depth > 0) { // TODO don’t use Page#findAll
        f.querySelector('[itemprop="hasPart"]').append(
          require(__filename).render({
            ...d,
            hasPart: d.findAll().filter((p) => !p.isHidden()),
          }, null, {
            ...(opts.options || {}),
            depth: depth - 1,
          })
        )
      }
    })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-directory.tpl.html'))
  .setRenderer(xDirectory_renderer)
