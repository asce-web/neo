import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPage} from '../interfaces'

const xjs = { ...xjs1, ...xjs2 }


interface OptsType {
	/**
	 * How many levels deep the outline should be; a non-negative integer, or `Infinity`.
	 * @default Infinity
	 */
	depth?: number;
	/**
	 * Which subpage to start at; non-negative integer.
	 * @default 0
	 */
	start?: number;
	/**
	 * Which subpage to end at; non-negative integer or `Infinity`.
	 * @default Infinity
	 */
	end?: number;
	/** group set of css class configurations */
	classes?: null|{
		/** list classes (`<ol>`) */
		list?: string;
		/** item classes (`<li>`) */
		item?: string;
		/** link classes (`<a>`) */
		link?: string;
		/** classes for page icon */
		icon?: string;
		/** classes for `expand_more` icon */
		expand?: string;
	};
	/** unknown docs */
	links?: object;
	/** configurations for nested outlines */
	opts?: OptsType;
}

const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/directory.tpl.html')) // NB relative to dist
  .node

/**
 * A nested `<ol>` marking up a site directory.
 * @param   frag the template content to process
 * @param   data a webpage with possible subpages
 * @param   opts additional processing options
*/
function instructions(frag: DocumentFragment, data: ConfPage, opts: OptsType): void {
  let depth: number = (opts.depth === 0) ? 0 : opts.depth || Infinity
  new xjs.HTMLOListElement(frag.querySelector('ol') !)
    .replaceClassString('{{ classes.list }}', opts.classes && opts.classes.list || '')
    .populate(function (f: DocumentFragment, d: ConfPage) {
      new xjs.HTMLElement(f.querySelector('li') !).replaceClassString('{{ classes.item }}', opts.classes && opts.classes.item || '')
      new xjs.HTMLAnchorElement(f.querySelector('a[itemprop="url"]') as HTMLAnchorElement)
        .replaceClassString('{{ classes.link }}', opts.classes && opts.classes.link || '')
        .href(d.url)
      f.querySelector('[itemprop="name"]') !.textContent = d.name

      /**
       * References to formatting elements.
       * We want to create these references before removing any elements from the DOM.
       */
      const formatting = {
        /** Icons for links. */ icons: [...f.querySelectorAll('i.material-icons')],
      }
			new xjs.Element(formatting.icons[0]).exe(function () {
				if (opts.classes && opts.classes.icon) {
					this.replaceClassString('{{ classes.icon }}', opts.classes.icon).textContent('temporary_icon')
				} else {
					this.node.remove()
				}
			})
			new xjs.Element(formatting.icons[1]).exe(function () {
				if (opts.classes && opts.classes.expand && d.hasPart && d.hasPart.length) {
					this.replaceClassString('{{ classes.expand }}', opts.classes.expand).textContent('expand_more')
				} else {
					this.node.remove()
				}
			})

      if (d.hasPart && d.hasPart.length && depth > 0) {
        new xjs.Element(f.querySelector('[itemprop="hasPart"]') !).append(
          require(__filename).process(d, {
            ...(opts.opts || {}),
            depth: depth - 1,
          })
        )
      }
    }, data.hasPart || [])
}

export default new Processor(template, instructions)
