const path = require('path')

const xjs = require('extrajs-dom')

const xSupporter = require('./x-supporter.tpl.js')


/**
 * @summary A `<section.c-SupporterBlock>` marking up a group of supporter logos belonging to one level.
 * @param {DocumentFragment} frag the template content with which to render
 * @param   {sdo.Offer} data            http://schema.org/Offer
 * @param   {string}    data.name       http://schema.org/name
 * @param   {string=}   data.$logoSize  if given, either `Small`, `Medium`, or `Large`; the logo size to render
 * @param   {boolean=}  data.$isSponsor is the level awarded to financial contributors?
 * @param   {!Object=} opts additional rendering options
 * @param   {boolean=} opts.small should logo sizing be overridden to `Small`?
 * @param   {string=}  opts.classname any other classname(s) to add to the `<section>`
 * @param   {Conference} opts.conference the conference to which this supporter level belongs
 */
module.exports.renderer = function xSupporterLevel_renderer(frag, data, opts = {}) {
  /**
   * Array of supporters in the level.
   * @type {Array<sdo.Organization>}
   */
  let supporters = (opts.conference._DATA.sponsor || []).filter((org) => org.$level === data.name)
  new xjs.HTMLElement(frag.querySelector('.c-SupporterBlock')).addClass(({
    'Small' : 'c-SupporterBlock--sml',
    'Medium': 'c-SupporterBlock--med',
    'Large' : 'c-SupporterBlock--lrg',
  })[(opts.small) ? 'Small' : (data.$logoSize || 'Small')], opts.classname || '')
  frag.querySelector('.c-SupporterBlock__Hn').textContent = data.name
  new xjs.HTMLUListElement(frag.querySelector('.c-SupporterBlock__List')).populate(function (f, d, o = {}) {
    new xjs.HTMLLIElement(f.querySelector('li')).empty().append(xSupporter.template.render(xSupporter.renderer, d, { is_sponsor: data.$isSponsor }))
  }, supporters)
}

module.exports.template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-supporter-level.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
  })
