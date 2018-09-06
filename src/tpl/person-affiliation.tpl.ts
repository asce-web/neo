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

type DataType = sdo.Person & {
	identifier  : string;
	givenName   : string;
	familyName  : string;
	affiliation : sdo.Organization;
}

/**
 * Markup for a person and affiliated organization.
 * @param   frag the template content to process
 * @param   data a person that has an affiliation
 * @param   {!Object=} opts additional rendering options
 */
function instructions(frag: DocumentFragment, data: DataType, opts = {}): void {
  frag.querySelector('[itemprop="affiliation"] [itemprop="name"]').textContent = data.affiliation && data.affiliation.name || ''
  frag.querySelector('[itemprop="name"]').append(xPersonFullname.render(data))
}

export default new Processor(template, instructions)
