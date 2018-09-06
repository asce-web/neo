import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfSite} from '../interfaces'

const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-sitetitle.tpl.html'))
  .node

/**
 * A `<a.c-SiteTitle>` element containing the site logo and title, linking to the home page.
 * @param   frag the template content to process
 * @param   data the webpage with possible description and logo
 */
function instructions(frag: DocumentFragment, data: ConfSite): void {
  frag.querySelector('[itemprop="name"]'       ).textContent = data.name
  frag.querySelector('[itemprop="description"]').textContent = data.description
  frag.querySelector('[itemprop="logo"]'       ).src = data.logo
  frag.querySelector('[itemprop="url"]'        ).href = data.url

  if (!data.description) frag.querySelector('[itemprop="description"]').remove()
  if (!data.logo       ) frag.querySelector('[itemprop="logo"]'       ).remove()
}

export default new Processor(template, instructions)
