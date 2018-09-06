import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Venue} from '../interfaces'

const {xAddress} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-venue.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * A `<section>` element marking up a venue.
 * @param   frag the template content to process
 * @param   data a venue for a conference
 */
function instructions(frag: DocumentFragment, data: Venue): void {
  frag.querySelector('[itemprop="description"]').textContent = data.description

  if (data.image) frag.querySelector('img[itemprop="image"]').src = data.image
  else            frag.querySelector('img[itemprop="image"]').remove()

  frag.querySelector('[itemprop="name"]').textContent = data.name

  frag.querySelector('[itemprop="address"]').append(xAddress.render({
    ...data.address,
  }))

  if (data.telephone) frag.querySelector('[itemprop="telephone"]').textContent = data.telephone
  else                frag.querySelector('[itemprop="telephone"]').remove()

  if (data.url) {
    frag.querySelector('a[itemprop="url"]').href = data.url
  } else {
    new xjs.HTMLAnchorElement(frag.querySelector('a[itemprop="url"]')).attr({
      href: null,
      itemprop: null,
    })
  }
}

export default new Processor(template, instructions)
