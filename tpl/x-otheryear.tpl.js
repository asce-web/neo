const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

/**
 * @summary xOtheryear renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Event} data a JSON object representing a single conference event
 * @param {string}  data.name the name of the conference
 * @param {string}  data.url the url of the conference
 * @param {string=} data.image the hero image for the conference
 * @param {string=} data.startDate the starting date of the conference, in ISO string format
 * @param {sdo.PostalAddress=} data.location the promoted location of the conference
 * @param {string=} data.location.image the promoted location of the conference
 * @param {string=} data.$blurb blurb promoting the prev/next conference
 * @param {string=} data.$body body rich text // TEMP this should be buttons
 */
function xOtheryear_renderer(frag, data) {
  const Util = require('../class/Util.class.js')

  /* // BUG https://github.com/jsdom/jsdom/issues/1895
  new xjs.HTMLElement(frag.querySelector('.c-Banner')).style('--banner-img', (data.image) ? `url('${data.image}')` : null)
   */ frag.querySelector('.c-Banner').setAttribute('style', `--banner-img: ${(data.image) ? `url('${data.image}')` : null};`)


  frag.querySelector('[itemprop="name"]'         ).textContent  = data.name
  frag.querySelector('meta[itemprop="startDate"]').content      = data.startDate
  frag.querySelector('[itemprop="location"]'     ).innerHTML    = Util.view(data.location).promoLoc()

  if (data.$blurb) {
    frag.querySelector('p.h-Hidden-nM').textContent = data.$blurb
  } else {
    frag.querySelector('p.h-Hidden-nM').remove()
  }
  frag.querySelector('slot[name="body"]').innerHTML = data.$body || ''
  // frag.querySelector('meta[itemprop="url"]').content = data.url
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-otheryear.tpl.html'))
  .setRenderer(xOtheryear_renderer)
