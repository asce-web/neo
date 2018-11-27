import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Conference, Supporter, SupporterLevel} from '../interfaces'
import supporter_processor from './supporter.tpl'

const xjs = { ...xjs1, ...xjs2 }


interface OptsTypeXSupporterLevel {
	/** should logo sizing be overridden to `Small`? */
	small?: boolean;
  /** any other class(es) to add to the `<section>` */
	classname?: string;
	/** the conference to which this supporter level belongs */
	conference: Conference; // FIXME this should not be required
}

const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/supporterlevel.tpl.html')) // NB relative to dist
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template') !.content).importLinks(__dirname)
  })
  .node

function instructions(frag: DocumentFragment, data: SupporterLevel, opts: OptsTypeXSupporterLevel): void {
  /** Array of supporters in the level. */
  let supporters: Supporter[] = (opts.conference.sponsor || []).filter((org) => org.$level === data.name)
  new xjs.Element(frag.querySelector('.c-SupporterBlock') !).addClass((xjs.Object.switch<string>((opts.small) ? 'Small' : (data.$logosize || 'default'), {
    'Small' : () => 'c-SupporterBlock--sml',
    'Medium': () => 'c-SupporterBlock--med',
    'Large' : () => 'c-SupporterBlock--lrg',
    default : () => 'c-SupporterBlock--sml',
  })()), opts.classname || '')
  frag.querySelector('.c-SupporterBlock__Hn') !.textContent = data.name
  new xjs.HTMLUListElement(frag.querySelector('ul') !).populate(function (f: DocumentFragment, d: Supporter) {
    new xjs.HTMLLIElement(f.querySelector('li') !).empty().append(supporter_processor.process(d, { is_sponsor: data.$isSponsor }))
  }, supporters)
}

/**
 * A `<section.c-SupporterBlock>` marking up a group of supporter logos belonging to one level.
 */
const xSupporterLevel: Processor<SupporterLevel, OptsTypeXSupporterLevel> = new Processor(template, instructions)
export default xSupporterLevel
