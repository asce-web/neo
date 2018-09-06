import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPerson} from '../interfaces'
import list_social_processor from './list-social.tpl'

const {xPersonFullname} = require('aria-patterns')

const Util = require('../../class/Util.class.js')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../tpl/x-speaker.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * An `<article.c-Speaker>` component marking up a person’s speaker information.
 * @param   frag the template content to process
 * @param   data a person that has a possible job title, an affiliated organization, and social media contact links
 */
function instructions(frag: DocumentFragment, data: ConfPerson): void {
  frag.querySelector('[itemtype="http://schema.org/Person"]'     ).id          = data.identifier
  frag.querySelector('[itemprop="image"]'                        ).src         = data.image || ''
  frag.querySelector('[itemprop="jobTitle"]'                     ).textContent = data.jobTitle || ''
  frag.querySelector('[itemprop="affiliation"] [itemprop="name"]').textContent = data.affiliation && data.affiliation.name || ''

  frag.querySelector('[itemprop="name"]').append(xPersonFullname.render(data))

  new xjs.HTMLUListElement(frag.querySelectorAll('.c-SocialList')[0]).exe(function () {
    this.node.before(list_social_processor.process((data.$social || []), {
      classes: 'c-SocialList--speaker',
    }))
  }).populate(function (f: DocumentFragment, d: { prop: 'url'|'email'|'telephone'; icon: string; url: string; text: string }) {
    if (!data[d.prop]) {
      new xjs.DocumentFragment(f).empty()
    } else {
    f.querySelector('slot').textContent = d.text
    new xjs.HTMLAnchorElement(f.querySelector('a'))
      .replaceClassString('{{ icon }}', d.icon)
      .attr({ href: d.url, itemprop: d.prop })
    }
  }, [
    { prop: 'url'      , icon: 'explore', url: data.url                           , text: 'visit homepage' },
    { prop: 'email'    , icon: 'email'  , url: `mailto:${data.email}`             , text: 'send email'     },
    { prop: 'telephone', icon: 'phone'  , url: `tel:${Util.toURL(data.telephone)}`, text: 'call'           },
  ])
}

export default new Processor(template, instructions)
