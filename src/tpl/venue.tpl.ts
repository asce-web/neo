import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

const {xAddress} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-venue.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * @summary Markup for a venue.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Accommodation} data a JSON object representing the venue
 * @param {string} data.description the label or title for the venue
 * @param {string=} data.url the url of this place
 * @param {string=} data.image the photo url for this place
 * @param {string=} data.name the name of this place
 * @param {sdo.PostalAddress=} data.address the physical address of this place
 * @param {string=} data.telephone the telephone number of this place
 * @param {{url:string, text:string}=} data.$cta a call-to-action link with a url and text
 * @param {string}  data.$cta.url the url of the call-to-action
 * @param {string}  data.$cta.text the text of the call-to-action
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag, data, opts = {}) {
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
