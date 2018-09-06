import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ConfPerson} from '../interfaces'

const {xPersonFullname} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../tpl/x-person-affiliation.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * Markup for a person and affiliated organization.
 * @param   frag the template content to process
 * @param   data a person that has an affiliation
 */
function instructions(frag: DocumentFragment, data: ConfPerson): void {
  frag.querySelector('[itemprop="affiliation"] [itemprop="name"]') !.textContent = data.affiliation && data.affiliation.name || ''
  new xjs.Element(frag.querySelector('[itemprop="name"]') !).append(xPersonFullname.render(data))
}

export default new Processor(template, instructions)
