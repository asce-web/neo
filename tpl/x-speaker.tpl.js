const path = require('path')

const xjs = require('extrajs-dom')

const Util = require('../class/Util.class.js')
const xPersonFullname = require('./x-person-fullname.tpl.js')


/**
 * @summary An `<article.c-Speaker>` component marking up a person’s speaker information.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Person} data a JSON object representing a Person
 * @param {string} jsondata.identifier a unique identifier of the person
 * @param {string}  data.givenName the person’s first name
 * @param {string}  data.familyName the person’s last name
 * @param {string=} data.additionalName  the person’s middle name or initial
 * @param {string=} data.honorificPrefix a prefix, if any (e.g. 'Mr.', 'Ms.', 'Dr.')
 * @param {string=} data.honorificSuffix the suffix, if any (e.g. 'M.D.', 'P.ASCE')
 * @param {string=} data.image the url to a headshot image of the person
 * @param {string=} data.url the url to the person’s homepage or website
 * @param {string=} data.email the person’s email address
 * @param {string=} data.telephone the person’s telephone number
 * @param {string=} data.jobTitle the person’s job title
 * @param {sdo.Organization} data.affiliation an organization that the person is affiliated with
 * @param {string=}          data.affiliation.name an organization that the person is affiliated with
 * @param {{Array<!Object>}=} data.sameAs a list of social media links for the person
 * @param {string}            data.sameAs.name the name or identifier of the social media service (used for icons)
 * @param {string}            data.sameAs.url the URL of the person’s social media profile or page
 * @param {string=}           data.sameAs.description short alternative text for non-visual media
 */
function xSpeaker_renderer(frag, data) {
  frag.querySelector('[itemprop="image"]'   ).src = data.image
  frag.querySelector('[itemprop="name"]'    ).id  = data.identifier
  frag.querySelector('[itemprop="jobTitle"]').textContent = data.jobTitle
  frag.querySelector('[itemprop="affiliation"] slot').textContent = data.affiliation
  frag.querySelector('footer').prepend("Util.view(this.getSocialAll()).socialList('c-SocialList--speaker')")

  new xjs.HTMLElement(frag.querySelector('[itemprop="name"]')).empty().append(xPersonFullname.render(data))

  let container = frag.querySelector('.c-SocialList')
  let itemdata = [
    { prop: 'url'      , icon: 'explore', url: data.url                           , text: 'visit homepage' },
    { prop: 'email'    , icon: 'email'  , url: `mailto:${data.email}`             , text: 'send email'     },
    { prop: 'telephone', icon: 'phone'  , url: `tel:${Util.toURL(data.telephone)}`, text: 'call'           },
  ]
  let xSocialListItem = new xjs.HTMLTemplateElement(container.querySelector('template')).setRenderer(function (f, d) {
    f.querySelector('slot').textContent = d.text
    new xjs.HTMLAnchorElement(f.querySelector('a'))
      .replaceClassString('{{ icon }}', d.icon)
      .attr({ href: d.url, itemprop: d.prop })
  })
  container.append(...itemdata.map((datum) => (!data[datum.prop]) ? null : xSocialListItem.render(datum)))
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-speaker.tpl.html'))
  .setRenderer(xSpeaker_renderer)
