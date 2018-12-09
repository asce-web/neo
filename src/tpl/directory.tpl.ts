import * as path from 'path'

import {NaNError} from 'extrajs'
import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPage} from '../interfaces'


interface OptsTypeXDirectory {
	/**
	 * How many levels deep the outline should be; a non-negative integer, or `Infinity`.
	 * @default Infinity
	 */
	depth?: number;
	/**
	 * The subpage at which to start; an integer.
	 *
	 * Works just like the first parameter of
	 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice|Array#slice}.
	 * @default 0
	 */
	start?: number;
	/**
	 * The subpage at which to end; an integer or `Infinity`.
	 *
	 * Works just like the last parameter of
	 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice|Array#slice}.
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
	opts?: OptsTypeXDirectory;
}

const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/directory.tpl.html')) // NB relative to dist
  .node

function instructions(frag: DocumentFragment, data: ConfPage, opts: OptsTypeXDirectory): void {
	;[opts.depth, opts.start, opts.end].forEach((n) => { if (Number.isNaN(n !)) throw new NaNError() })
  let depth: number = (opts.depth === 0) ? 0 : opts.depth || Infinity
  new xjs.HTMLOListElement(frag.querySelector('ol') !)
    .replaceClassString('{{ classes.list }}', opts.classes && opts.classes.list || '')
    .populate(function (f, d) {
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
          xDirectory.process(d, {
            ...(opts.opts || {}),
            depth: depth - 1,
          })
        )
      }
    }, (data.hasPart || []).slice(opts.start || 0, opts.end || Infinity))
}

/**
 * A nested `<ol>` marking up a site directory.
*/
const xDirectory: Processor<ConfPage, OptsTypeXDirectory> = new Processor(template, instructions)
export default xDirectory
