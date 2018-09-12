import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Hyperlink} from '../interfaces'


interface OptsType {
	/** any other class(es) to add to the `<ul>` */
	classes?: string;
}

const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/list-social.tpl.html')) // NB relative to dist // TODO use `xjs.HTMLUListElement.templateSync()`
  .node

/**
 * A `<ul>` list of social media links.
 * @param   frag the template content to process
 * @param   data an array of links
 * @param   opts additional processing options
 */
function instructions(frag: DocumentFragment, data: Hyperlink[], opts: OptsType): void {
  new xjs.HTMLUListElement(frag.querySelector('ul') !)
    .replaceClassString('{{ listclasses }}', opts.classes || '')
    .populate(function (f: DocumentFragment, d: Hyperlink) {
      new xjs.HTMLAnchorElement(f.querySelector('a') !)
        .replaceClassString('{{ name }}', d.name || '')
        .href(d.url)
      f.querySelector('slot') !.textContent = d.text
    }, data)
}

export default new Processor(template, instructions)
