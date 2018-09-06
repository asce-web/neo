import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Conference, Pass} from '../interfaces'
import registrationperiod_processor from './registrationperiod.tpl'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-pass.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

interface OptsType {
	/** the conference to which this pass belongs */
	conference: Conference; // FIXME this should not be required
}

/**
 * An `<article.c-Pass>` component marking up a pass’s info.
 * @param   frag the template content to process
 * @param   data a single pass
 * @param   opts additional processing options
 */
function instructions(frag: DocumentFragment, data: Pass, opts: OptsType): void {
  let current_period = opts.conference.currentRegistrationPeriod
  frag.querySelector('.c-Pass__Hn'       ) !.textContent = data.name              // TODO use `[itemprop="name"]` and add to markup
  frag.querySelector('.c-Pass__Desc slot') !.textContent = data.description || '' // TODO use `[itemprop="description"]` and add to markup
  if (data.disambiguatingDescription) {
    frag.querySelector('.c-Pass__Fine') !.textContent = data.disambiguatingDescription || '' // TODO use `[itemprop="disambiguatingDescription"]` and add to markup
  } else frag.querySelector('.c-Pass__Fine') !.remove()

  new xjs.Element(frag.querySelector('.c-Pass__Body') !).append(
    registrationperiod_processor.process(current_period, { pass: data, is_body: true })
  )

  new xjs.Element(frag.querySelector('.c-Pass__Foot') !).append(
    ...opts.conference.getRegistrationPeriodsAll()
      .filter((period) => period.name !== current_period.name)
      .map((period) => registrationperiod_processor.process(period, { pass: data }))
  )
}

export default new Processor(template, instructions)
