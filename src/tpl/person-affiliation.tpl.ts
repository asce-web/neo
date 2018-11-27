import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'
import {xPersonFullname} from 'aria-patterns'

import {ConfPerson} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, '../../src/tpl/person-affiliation.tpl.html')) // NB relative to dist
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
  new xjs.Element(frag.querySelector('[itemprop="name"]') !).append(xPersonFullname.process(data))
}

export default new Processor(template, instructions)
