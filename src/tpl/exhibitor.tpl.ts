import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Exhibitor} from '../interfaces'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-exhibitor.tpl.html'))
  .node

/**
 * Markup for an exhibitor logo.
 * @param   frag the template content to process
 * @param   data the exhibiting organization
 */
function instructions(frag: DocumentFragment, data: Exhibitor): void {
  frag.querySelector('a[itemprop="url"]'   ).href        = data.url
  frag.querySelector('[itemprop="name"]'   ).textContent = data.name
  frag.querySelector('slot[name="booth"]'  ).textContent = data.$booth
  frag.querySelector('img[itemprop="logo"]').src         = data.logo

  if (!data.$isSponsor) {
    frag.querySelector('strong').remove()
    new xjs.HTMLAnchorElement(frag.querySelector('a')).removeClass('-fw-b')
  }
}

export default new Processor(template, instructions)
