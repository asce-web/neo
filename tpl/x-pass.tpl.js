const path = require('path')

const xjs = require('extrajs-dom')

const xRegistrationperiod = require('./x-registrationperiod.tpl.js')


/**
 * @summary An `<article.c-Pass>` component marking up a pass’s info.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {sdo.AggregateOffer} data                           http://schema.org/AggregateOffer
 * @param   {string}             data.name                      http://schema.org/name
 * @param   {string=}            data.description               http://schema.org/description
 * @param   {string=}            data.disambiguatingDescription http://schema.org/disambiguatingDescription
 * @param   {!Object=} opts additional rendering options
 * @param   {Conference} opts.conference the conference to which this pass belongs
 */
function xPass_renderer(frag, data, opts = {}) {
  let current_period = opts.conference.currentRegistrationPeriod
  frag.querySelector('.c-Pass__Hn'       ).textContent = data.name
  frag.querySelector('.c-Pass__Desc slot').textContent = data.description || ''
  if (data.disambiguatingDescription) {
    frag.querySelector('.c-Pass__Fine').textContent = data.disambiguatingDescription || ''
  } else frag.querySelector('.c-Pass__Fine').remove()

  frag.querySelector('.c-Pass__Body').append(
    xRegistrationperiod.render(current_period, null, { pass: data, is_body: true })
  )

  frag.querySelector('.c-Pass__Foot').append(
    ...opts.conference.getRegistrationPeriodsAll()
      .filter((registration_period) => registration_period.name !== current_period.name)
      .map((registration_period) => xRegistrationperiod.render(registration_period, null, { pass: data }))
  )
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-pass.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .setRenderer(xPass_renderer)
