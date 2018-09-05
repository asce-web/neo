import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

const {xPersonFullname} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../tpl/x-person-affiliation.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * @summary xPersonAffiliation renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Person} data a JSON object representing a Person
 * @param {string}  data.identifier      http://schema.org/identifier
 * @param {string}  data.givenName       http://schema.org/givenName
 * @param {string}  data.familyName      http://schema.org/familyName
 * @param {string=} data.additionalName  http://schema.org/additionalName
 * @param {string=} data.honorificPrefix http://schema.org/honorificPrefix
 * @param {string=} data.honorificSuffix http://schema.org/honorificSuffix
 * @param {sdo.Organization} data.affiliation      http://schema.org/affiliation
 * @param {string=}          data.affiliation.name http://schema.org/name
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag, data, opts = {}) {
  frag.querySelector('[itemprop="affiliation"] [itemprop="name"]').textContent = data.affiliation && data.affiliation.name || ''
  frag.querySelector('[itemprop="name"]').append(xPersonFullname.render(data))
}

export default new Processor(template, instructions)
