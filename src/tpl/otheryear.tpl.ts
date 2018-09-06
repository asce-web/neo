import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

const {xAddress} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-otheryear.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

type DataType = sdo.Organization & {
	name     : string;
	url      : string;
	startDate: string;
	location : sdo.PostalAddress;
}

/**
 * An about page `<aside>` containing other conferences’ most important info.
 * @param   frag the template content to process
 * @param   data a single conference event
 */
function instructions(frag: DocumentFragment, data: DataType): void {
  /* // BUG https://github.com/jsdom/jsdom/issues/1895
  new xjs.HTMLElement(frag.querySelector('.c-Banner')).style('--banner-img', (data.image) ? `url('${data.image}')` : null)
   */ frag.querySelector('.c-Banner').setAttribute('style', `--banner-img: ${(data.image) ? `url('${data.image}')` : null};`)


  frag.querySelector('[itemprop="name"]'         ).textContent = data.name
  frag.querySelector('a[itemprop="url"]'         ).href        = data.url
  frag.querySelector('meta[itemprop="startDate"]').content     = data.startDate
  frag.querySelector('[itemprop="location"]'     ).append(xAddress.render({
    ...data.location,
    $regionName: true,
  }))

  if (data.disambiguatingDescription) {
    frag.querySelector('[itemprop="disambiguatingDescription"]').textContent = data.disambiguatingDescription
  } else {
    frag.querySelector('[itemprop="disambiguatingDescription"]').remove()
  }
}

export default new Processor(template, instructions)
