import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

const {xPersonFullname} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../tpl/x-person-contact.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * Markup for a person and contact information.
 * @param   frag the template content to process
 * @param {sdo.Person} data a JSON object representing a Person
 * @param {string}  data.identifier      http://schema.org/identifier
 * @param {string}  data.givenName       http://schema.org/givenName
 * @param {string}  data.familyName      http://schema.org/familyName
 * @param {string=} data.additionalName  http://schema.org/additionalName
 * @param {string=} data.honorificPrefix http://schema.org/honorificPrefix
 * @param {string=} data.honorificSuffix http://schema.org/honorificSuffix
 * @param {string}  data.jobTitle        http://schema.org/jobTitle
 * @param {string=} data.email           http://schema.org/email
 * @param {string=} data.telephone       http://schema.org/telephone
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag: DocumentFragment, data, opts = {}): void {
  frag.querySelector('[itemprop="name"]').append(xPersonFullname.render(data))
  frag.querySelector('[itemprop="jobTitle"]' ).textContent = data.jobTitle

  new xjs.HTMLAnchorElement(frag.querySelector('[itemprop="email"]'))
    .href(data.email ? `mailto:${data.email}` : null)
    .attr('itemprop', data.email ? 'email' : null)

  if (data.telephone) {
    new xjs.HTMLAnchorElement(frag.querySelector('[itemprop="telephone"]'))
      .href(data.telephone)
      .attr('itemprop', data.telephone)
      .textContent(data.telephone)
  } else {
    frag.querySelector('[itemprop="jobTitle"] + span').remove()
    frag.querySelector('[itemprop="telephone"]').remove()
  }
}

export default new Processor(template, instructions)
