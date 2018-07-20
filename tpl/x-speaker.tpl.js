const path = require('path')

const xjs = require('extrajs-dom')

const {xPersonFullname} = require('aria-patterns')

const Util = require('../class/Util.class.js')
const xListSocial = require('../tpl/x-list-social.tpl.js')


/**
 * @summary An `<article.c-Speaker>` component marking up a person’s speaker information.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Person} data a JSON object representing a Person
 * @param {string}  data.identifier      http://schema.org/identifier
 * @param {string}  data.givenName       http://schema.org/givenName
 * @param {string}  data.familyName      http://schema.org/familyName
 * @param {string=} data.additionalName  http://schema.org/additionalName
 * @param {string=} data.honorificPrefix http://schema.org/honorificPrefix
 * @param {string=} data.honorificSuffix http://schema.org/honorificSuffix
 * @param {string=} data.image           http://schema.org/image
 * @param {string=} data.url             http://schema.org/url
 * @param {string=} data.email           http://schema.org/email
 * @param {string=} data.telephone       http://schema.org/telephone
 * @param {string=} data.jobTitle        http://schema.org/jobTitle
 * @param {sdo.Organization} data.affiliation http://schema.org/affiliation
 * @param {string=}          data.affiliation.name
 * @param   {{Array<sdo.WebPageElement>}=} data.$social
 * @param   {!Object=} opts additional rendering options
 */
function xSpeaker_renderer(frag, data, opts = {}) {
  frag.querySelector('[itemtype="http://schema.org/Person"]'     ).id          = data.identifier
  frag.querySelector('[itemprop="image"]'                        ).src         = data.image || ''
  frag.querySelector('[itemprop="jobTitle"]'                     ).textContent = data.jobTitle || ''
  frag.querySelector('[itemprop="affiliation"] [itemprop="name"]').textContent = data.affiliation && data.affiliation.name || ''

  frag.querySelector('[itemprop="name"]').append(xPersonFullname.render(data))

  new xjs.HTMLUListElement(frag.querySelectorAll('.c-SocialList')[0]).exe(function () {
    this.node.before(xListSocial.render((data.$social || []), null, {
      classes: 'c-SocialList--speaker',
    }))
  }).populate([
    { prop: 'url'      , icon: 'explore', url: data.url                           , text: 'visit homepage' },
    { prop: 'email'    , icon: 'email'  , url: `mailto:${data.email}`             , text: 'send email'     },
    { prop: 'telephone', icon: 'phone'  , url: `tel:${Util.toURL(data.telephone)}`, text: 'call'           },
  ], function (f, d, o = {}) {
    if (!data[d.prop]) {
      new xjs.DocumentFragment(f).empty()
    } else {
    f.querySelector('slot').textContent = d.text
    new xjs.HTMLAnchorElement(f.querySelector('a'))
      .replaceClassString('{{ icon }}', d.icon)
      .attr({ href: d.url, itemprop: d.prop })
    }
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-speaker.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .setRenderer(xSpeaker_renderer)
