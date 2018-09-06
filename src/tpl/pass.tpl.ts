import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Registrationperiod from './registrationperiod.tpl'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-pass.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

type DataType = sdo.AggregateOffer & {
	name: string;
}

/**
 * An `<article.c-Pass>` component marking up a pass’s info.
 * @param   frag the template content to process
 * @param   data a single pass
 * @param   {!Object=} opts additional rendering options
 * @param   {Conference} opts.conference the conference to which this pass belongs
 */
function instructions(frag: DocumentFragment, data: DataType, opts = {}): void {
  let current_period = opts.conference.currentRegistrationPeriod
  frag.querySelector('.c-Pass__Hn'       ).textContent = data.name
  frag.querySelector('.c-Pass__Desc slot').textContent = data.description || ''
  if (data.disambiguatingDescription) {
    frag.querySelector('.c-Pass__Fine').textContent = data.disambiguatingDescription || ''
  } else frag.querySelector('.c-Pass__Fine').remove()

  frag.querySelector('.c-Pass__Body').append(
    Registrationperiod.process(current_period, { pass: data, is_body: true })
  )

  frag.querySelector('.c-Pass__Foot').append(
    ...opts.conference.getRegistrationPeriodsAll()
      .filter((period) => period.name !== current_period.name)
      .map((period) => Registrationperiod.process(period, { pass: data }))
  )
}

export default new Processor(template, instructions)
