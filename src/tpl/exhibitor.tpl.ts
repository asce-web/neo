import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-exhibitor.tpl.html'))
  .node

/**
 * @summary Markup for an exhibitor logo.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Organization} data http://schema.org/Organization
 * @param {string}  data.name        http://schema.org/name
 * @param {string}  data.url         http://schema.org/url
 * @param {string}  data.logo        http://schema.org/logo
 * @param {string=} data.description http://schema.org/description
 * @param {number}  data.$booth the booth number of the exhibitor
 * @param {boolean=} data.$isSponsor does the exhibitor also happen to be a sponsor?
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag, data, opts = {}) {
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
