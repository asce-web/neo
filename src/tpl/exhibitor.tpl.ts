import * as path from 'path'

import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Exhibitor} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/exhibitor.tpl.html'))
  .node

function instructions(frag: DocumentFragment, data: Exhibitor): void {
  frag.querySelector('[itemprop="name"]') !.textContent = data.name
  frag.querySelector('[name="booth"]'   ) !.textContent = `${data.$booth}`
  ;(frag.querySelector('a[itemprop="url"]'   ) as HTMLAnchorElement).href = data.url
  ;(frag.querySelector('img[itemprop="logo"]') as HTMLImageElement ).src  = data.logo

  if (!data.$isSponsor) {
    frag.querySelector('strong') !.remove()
    new xjs.Element(frag.querySelector('.-fw-b') !).removeClass('-fw-b')
  }
}

/**
 * Markup for an exhibitor logo.
 */
const xExhibitor: Processor<Exhibitor, object> = new Processor(template, instructions)
export default xExhibitor
