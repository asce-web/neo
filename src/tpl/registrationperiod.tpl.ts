import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Pass, RegistrationPeriod} from '../interfaces'
import attendeetype_processor from './attendeetype.tpl'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-registrationperiod.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

interface OptsType {
	/** should this period be placed in the body, and not the footer, of the pass? */
	is_body?: boolean;
	/** the pass of which this markup is a part */
	pass: Pass;
}

/**
 * A `<section.c-Pass__Period>` subcomponent marking up this period’s info.
 * @param   frag the template content to process
 * @param   data a single registration period
 * @param   opts additional processing options
 */
function instructions(frag: DocumentFragment, data: RegistrationPeriod, opts: OptsType): void {
  let date_start = (data.availabilityStarts) ? new Date(data.availabilityStarts) : null
  let date_end   = (data.availabilityEnds  ) ? new Date(data.availabilityEnds  ) : null

	new xjs.Element(frag.querySelector('.c-Pass__Period') !).replaceClassString('{{ is_body }}', (!opts.is_body) ? 'o-Flex__Item' : '')
	frag.querySelector('[name="offer-name"]') !.textContent = data.name
	frag.querySelector('[name="pass-name"]' ) !.textContent = `${opts.pass.name}: `
	;(frag.querySelector('meta[itemprop="offerCount"]') as HTMLMetaElement).content = opts.pass.offers.length

	// FIXME control flow
	if (date_start) (frag.querySelector('meta[itemprop="availabilityStarts"]') as HTMLMetaElement).content = date_start.toISOString()
	else            (frag.querySelector('meta[itemprop="availabilityStarts"]') as HTMLMetaElement).remove()
	if (date_end  ) (frag.querySelector('meta[itemprop="availabilityEnds"]'  ) as HTMLMetaElement).content = date_end.toISOString()
	else            (frag.querySelector('meta[itemprop="availabilityEnds"]'  ) as HTMLMetaElement).remove()

  new xjs.HTMLElement(frag.querySelector('dl') !).append(
    ...opts.pass.offers.map((att_type) =>
      attendeetype_processor.process({ ...att_type, price: 42.87 }) // TODO price is 42 for now
    )
  )
}

export default new Processor(template, instructions)
