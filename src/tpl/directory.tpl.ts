import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

const xjs = { ...xjs1, ...xjs2 }


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-directory.tpl.html'))
  .node

type DataType = sdo.WebPage & {
	hasPart?: sdo.WebPage|sdo.WebPage[];
}

/**
 * A nested `<ol>` marking up a site directory.
 * @param   frag the template content to process
 * @param   data a webpage with possible subpages
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
function instructions(frag: DocumentFragment, data: DataType, opts = {}): void {
  let subpages = (xjs.Object.typeOf(data.hasPart) === 'array' ) ? data.hasPart : [data.hasPart]
  let depth    = (xjs.Object.typeOf(opts.depth)   === 'number') ? opts.depth   : Infinity
  new xjs.HTMLOListElement(frag.querySelector('ol'))
    .replaceClassString('{{ classes.list }}', opts.classes && opts.classes.list || '')
    .populate(function (f, d, o = {}) {
      new xjs.HTMLLIElement(f.querySelector('[itemprop="hasPart"]')).replaceClassString('{{ classes.item }}', opts.classes && opts.classes.item || '')
      new xjs.HTMLAnchorElement(f.querySelector('[itemprop="url"]'))
        .replaceClassString('{{ classes.link }}', opts.classes && opts.classes.link || '')
        .href(d.url()) // TODO don’t use Page#url()
      f.querySelector('slot[itemprop="name"]').textContent = d.name() // TODO don’t use Page#name()

      /**
       * @summary References to formatting elements.
       * @description We want to create these references before removing any elements from the DOM.
       * @private
       * @constant {!Object}
       */
      const formatting = {
        /** Icons for links. */ icons: [...f.querySelectorAll('i.material-icons')],
      }
      if (xjs.Object.typeOf(opts.classes && opts.classes.icon) === 'string') {
        new xjs.HTMLElement(formatting.icons[0])
          .replaceClassString('{{ classes.icon }}', opts.classes && opts.classes.icon || '')
          .textContent(d.getIcon()) // TODO don’t use ConfPage#getIcon()
      } else {
        formatting.icons[0].remove()
      }
      if (xjs.Object.typeOf(opts.classes && opts.classes.expand) === 'string' && d.findAll().length) { // TODO don’t use Page#findAll
        new xjs.HTMLElement(formatting.icons[1])
          .replaceClassString('{{ classes.expand }}', opts.classes && opts.classes.expand || '')
      } else {
        formatting.icons[1].remove()
      }

      if (d.findAll().length && depth > 0) { // TODO don’t use Page#findAll
        f.querySelector('[itemprop="hasPart"]').append(
          require(__filename).template.render(instructions, {
            ...d,
            hasPart: d.findAll().filter((p) => !p.isHidden()),
          }, {
            ...(opts.options || {}),
            depth: depth - 1,
          })
        )
      }
    }, subpages)
}

export default new Processor(template, instructions)
