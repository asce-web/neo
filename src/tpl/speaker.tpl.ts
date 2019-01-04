import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'
import {xPersonFullname} from 'aria-patterns'

import {ConfPerson} from '../interfaces'
import Util from '../class/Util.class'
import xListSocial from './list-social.tpl'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../src/tpl/speaker.tpl.html')) // NB relative to dist
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

function instructions(frag: DocumentFragment, data: ConfPerson): void {
  frag.querySelector('[itemtype="http://schema.org/Person"]'     ) !.id          = data.identifier
  frag.querySelector('[itemprop="jobTitle"]'                     ) !.textContent = data.jobTitle || ''
  frag.querySelector('[itemprop="affiliation"] [itemprop="name"]') !.textContent = data.affiliation && data.affiliation.name || ''
  ;(frag.querySelector('img[itemprop="image"]') as HTMLImageElement).src = data.image || ''

	new xjs.Element(frag.querySelector('[itemprop="name"]') !).append(xPersonFullname.process(data))

	new xjs.Element(frag.querySelector('.c-Speaker__Foot template') !).after(...[
		xListSocial.process((data.$social || []), {
			classes: 'c-SocialList--speaker',
		}),
		// TODO make a new Processor for this list
		// TODO remove items if they are not provided
		xListSocial.process([
			{ /* "@type": "WebPageElement",*/ identifier: 'url'      , name: 'explore', text: 'visit homepage', url: `${               data.url       || '' }` },
			{ /* "@type": "WebPageElement",*/ identifier: 'email'    , name: 'email'  , text: 'send email'    , url: `mailto:${        data.email     || '' }` },
			{ /* "@type": "WebPageElement",*/ identifier: 'telephone', name: 'phone'  , text: 'call'          , url: `tel:${Util.toURL(data.telephone || '')}` },
		], {
			classes: 'c-SocialList--speaker',
		}),
	])
}

/**
 * An `<article.c-Speaker>` component marking up a person’s speaker information.
 */
const xSpeaker: Processor<ConfPerson, object> = new Processor(template, instructions)
export default xSpeaker
