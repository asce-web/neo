const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

/**
 * @summary xMainmenu renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {sdo.WebPage} data a http://schema.org/WebPage object
 * @param   {(sdo.WebPage|Array<sdo.WebPage>)} data.hasPart a subpage or an array of subpages (each a http://schema.org/WebPage object)
 * @param   {integer=} [data.$depth=Infinity] number of nested directory levels
 */
function xMainmenu_renderer(frag, data) {
  const Util = require('../class/Util.class.js')
  const {classes, links} = data.options
  let subpages = (xjs.Object.typeOf(data.hasPart) === 'array' ) ? data.hasPart : [data.hasPart]
  let depth    = (xjs.Object.typeOf(data.$depth)  === 'number') ? data.$depth  : Infinity
  new xjs.HTMLOListElement(frag.querySelector('ol'))
    .replaceClassString('{{ classes.list }}', classes.list || '')
    .populate(subpages, function (f, d) {
      const linkclasses = (links && links.classes) || {}
      new xjs.HTMLLIElement(f.querySelector('[itemprop="hasPart"]')).replaceClassString('{{ classes.item }}', classes.item || '')
      new xjs.HTMLAnchorElement(f.querySelector('[itemprop="url"]'))
        .replaceClassString('{{ classes.link }}', linkclasses.link || '')
        .href(d.url()) // TODO don’t use Page#url()
      f.querySelector('slot[itemprop="name"]').textContent = d.name() // TODO don’t use Page#name()

      const icons = [...f.querySelectorAll('i.material-icons')]
      if (xjs.Object.typeOf(linkclasses.icon) === 'string') {
        new xjs.HTMLElement(icons[0])
          .replaceClassString('{{ classes.icon }}', linkclasses.icon || '')
          .textContent(d.getIcon()) // TODO don’t use ConfPage#getIcon()
      } else {
        icons[0].remove()
      }
      if (xjs.Object.typeOf(linkclasses.expand) === 'string' && d.findAll().length) { // TODO don’t use Page#findAll
        new xjs.HTMLElement(f.querySelectorAll('i.material-icons')[1])
          .replaceClassString('{{ classes.expand }}', linkclasses.expand || '')
      } else {
        icons[1].remove()
      }

      if (d.findAll().length && depth > 0) { // TODO don’t use Page#findAll
        f.querySelector('[itemprop="hasPart"]').append(
          require(__filename).render({
            ...d,
            hasPart: d.findAll().filter((p) => !p.isHidden()),
            $depth: depth - 1,
            options: data.options.options,
          })
        )
      }
    })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-directory.tpl.html'))
  .setRenderer(xMainmenu_renderer)
