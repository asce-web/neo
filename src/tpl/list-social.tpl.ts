import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Hyperlink} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLUListElement.templateSync()
	.exe(function () {
		new xjs.HTMLUListElement(this.content().querySelector('ul') !).addClass('o-List o-Flex c-SocialList {{ listclasses }}')
		new xjs.HTMLLIElement(this.content().querySelector('template') !.content.querySelector('li') !)
			.addClass('o-List__Item o-Flex__Item c-SocialList__Item')
			.attr({
				itemprop : 'sameAs',
				itemscope: '',
				itemtype : 'http://schema.org/WebPageElement',
			})
			.innerHTML(`
				<a class="c-SocialList__Link h-Block c-SocialList__Link--{{ name }}" href="{{ url }}" itemprop="url">
					<slot class="h-Hidden" itemprop="text">{{ text }}</slot>
				</a>
			`)
	})
	.node

interface OptsType {
  /** any other class(es) to add to the `<ul>` */
	classes?: string;
}

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
      f.querySelector('[itemprop="text"]') !.textContent = d.text
    }, data)
}

export default new Processor(template, instructions)
