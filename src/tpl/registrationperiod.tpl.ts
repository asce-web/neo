import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import Attendeetype from './attendeetype.tpl'


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-registrationperiod.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

type DataType = sdo.AggregateOffer & {
	name: string;
	availabilityStarts?: string; // TODO `Offer#availabilityStarts`
	availabilityEnds  ?: string; // TODO `Offer#availabilityEnds`
}

/**
 * A `<section.c-Pass__Period>` subcomponent marking up this period’s info.
 * @param   frag the template content to process
 * @param   data a single registration period
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.is_body `true` if this period is to be placed in the body and not the footer
 * @param   {sdo.AggregateOffer} opts.pass                           http://schema.org/AggregateOffer
 * @param   {string}             opts.pass.name                      http://schema.org/name
 * @param   {Array<sdo.Offer>}   opts.pass.offers                    http://schema.org/offers
 */
function instructions(frag: DocumentFragment, data: DataType, opts = {}): void {
  let date_start = (data.availabilityStarts) ? new Date(data.availabilityStarts) : null
  let date_end   = (data.availabilityEnds  ) ? new Date(data.availabilityEnds  ) : null

  new xjs.HTMLElement(frag.querySelector('.c-Pass__Period')).replaceClassString('{{ is_body }}', (!opts.is_body) ? 'o-Flex__Item' : '')
  frag.querySelector('slot[name="offer-name"]').textContent = data.name
  frag.querySelector('slot[name="pass-name"]' ).textContent = `${opts.pass.name}: `
  frag.querySelector('[itemprop="offerCount"]').content = opts.pass.offers.length

  if (date_start)  frag.querySelector('[itemprop="availabilityStarts"]').content = date_start.toISOString()
  else             frag.querySelector('[itemprop="availabilityStarts"]').remove()
  if (date_end  )  frag.querySelector('[itemprop="availabilityEnds"]'  ).content = date_end.toISOString()
  else             frag.querySelector('[itemprop="availabilityEnds"]'  ).remove()

  frag.querySelector('dl').append(
    ...opts.pass.offers.map((att_type) =>
      Attendeetype.process({ "@type": "Offer", name: att_type.name, price: 42.87 }) // TODO price is 42 for now
    )
  )
}

export default new Processor(template, instructions)
