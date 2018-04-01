const path = require('path')

const xjs = require('extrajs-dom')

const {xPersonFullname} = require('aria-patterns')


/**
 * @summary xPersonContact renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Person} data a JSON object representing a Person
 * @param {string}  data.identifier      http://schema.org/identifier
 * @param {string}  data.givenName       http://schema.org/givenName
 * @param {string}  data.familyName      http://schema.org/familyName
 * @param {string=} data.additionalName  http://schema.org/additionalName
 * @param {string=} data.honorificPrefix http://schema.org/honorificPrefix
 * @param {string=} data.honorificSuffix http://schema.org/honorificSuffix
 * @param {string}  data.jobTitle        http://schema.org/jobTitle
 * @param {string=} data.email           http://schema.org/email
 * @param {string=} data.telephone       http://schema.org/telephone
 */
function xPersonContact_renderer(frag, data) {
  frag.querySelector('[itemprop="name"]').append(xPersonFullname.render(data))
  frag.querySelector('[itemprop="jobTitle"]' ).textContent = data.jobTitle

  new xjs.HTMLAnchorElement(frag.querySelector('[itemprop="email"]'))
    .href(data.email ? `mailto:${data.email}` : null)
    .attr('itemprop', data.email ? 'email' : null)

  if (data.telephone) {
    new xjs.HTMLAnchorElement(frag.querySelector('[itemprop="telephone"]'))
      .href(data.telephone)
      .attr('itemprop', data.telephone)
      .textContent(data.telephone)
  } else {
    frag.querySelector('[itemprop="jobTitle"] + span').remove()
    frag.querySelector('[itemprop="telephone"]').remove()
  }
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.resolve(__dirname, './x-person-contact.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .setRenderer(xPersonContact_renderer)
