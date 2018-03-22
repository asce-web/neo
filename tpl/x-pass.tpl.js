const path = require('path')

const xjs = require('extrajs-dom')

const Util = require('../class/Util.class.js')
const xRegistrationperiod = require('./x-registrationperiod.tpl.js')


/**
 * @summary An `<article.c-Pass>` component marking up a pass’s info.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {!Object} data a JSON object that validates against some schema?
 * @param {string} data.name the name or type of the pass
 * @param {string=} data.description a short description of this pass
 * @param {string=} data.$fineprint further details of this pass
 * @param {Array<string>=} data.$attendeeTypes types of attendees that can purchase this pass
 *                                             (usually based on membership)
 * @param {Conference} data.$conference the conference to which this pass belongs
 */
function xPass_renderer(frag, data) {
  let current_period = data.$conference.currentRegistrationPeriod
  frag.querySelector('.c-Pass__Hn'       ).textContent = data.name
  frag.querySelector('.c-Pass__Desc slot').textContent = data.description || ''
  if (data.$fineprint) frag.querySelector('.c-Pass__Fine').textContent = data.$fineprint || ''
  else                 frag.querySelector('.c-Pass__Fine').remove()

  frag.querySelector('.c-Pass__Body').append(
    xRegistrationperiod.render({ ...current_period._DATA, $pass: data, $is_body: true })
  )

  frag.querySelector('.c-Pass__Foot').append(
    ...data.$conference.getRegistrationPeriodsAll()
      .filter((registration_period) => registration_period.name !== current_period.name)
      .map((registration_period) => xRegistrationperiod.render({ ...registration_period._DATA, $pass: data }))
  )
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-pass.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .setRenderer(xPass_renderer)
