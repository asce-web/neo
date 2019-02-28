import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Conference, Pass, RegistrationPeriod} from '../interfaces'
import xRegistrationPeriod from './registrationperiod.tpl'


interface OptsTypeXPass {
	/** the conference to which this pass belongs */
	conference: Conference; // FIXME this should not be required
}

const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/pass.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

function instructions(frag: DocumentFragment, data: Pass, opts: OptsTypeXPass): void {
  // TODO programmatically determine current registration period by date
  let current_period: RegistrationPeriod = (opts.conference.offers || []).find((pd) => pd.name === opts.conference.$currentRegistrationPeriod) !
  frag.querySelector('[itemprop="name"]'       ) !.textContent = data.name
  frag.querySelector('[itemprop="description"]') !.textContent = data.description || ''
	new xjs.Element(frag.querySelector('[itemprop="disambiguatingDescription"]') !).exe(function () {
		if (data.disambiguatingDescription) this.node.textContent = data.disambiguatingDescription
		else this.node.remove()
	})

  new xjs.Element(frag.querySelector('.c-Pass__Body') !).append(
    xRegistrationPeriod.process(current_period, { pass: data, is_body: true })
  )

  new xjs.Element(frag.querySelector('.c-Pass__Foot') !).append(
    ...(opts.conference.offers || [])
      .filter((period) => period.name !== current_period.name)
      .map((period) => xRegistrationPeriod.process(period, { pass: data }))
  )
}

/**
 * An `<article.c-Pass>` component marking up a pass’s info.
 */
const xPass: Processor<Pass, OptsTypeXPass> = new Processor(template, instructions)
export default xPass
