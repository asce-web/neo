const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}


/**
 * @summary A `<tr.c-DateBlock__Item>` subcomponent containing a pair of `<td>`s,
 * marking up this date range as an important date with date and description.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.Action>} data an array of important dates, each with:
 * @param {string}  data.name the name of the important date range
 * @param {string}  data.startTime the start date, in ISO string format, of the date range
 * @param {string}  data.endTime   the end   date, in ISO string format, of the date range
 * @param {string=} data.url the url of the important date
 * @param   {!Object=} opts additional rendering options
 */
function xDateblock_renderer(frag, data, opts = {}) {
  new xjs.HTMLTableSectionElement(frag.querySelector('.c-DateBlock')).populate(data, function (f, d) {
    let date_start = new Date(d.startTime)
    let date_end   = new Date(d.endTime  )
    f.querySelectorAll('[itemprop~="startTime"]').forEach(function (time) {
      new xjs.HTMLTimeElement(time)
        .dateTime(date_start)
        .textContent(xjs.Date.format(date_start, 'M j, Y'))
    })
    new xjs.HTMLTimeElement(f.querySelector('[itemprop="endTime"]'))
      .dateTime(date_end)
      .textContent(xjs.Date.format(date_end, 'M j, Y'))
    if (xjs.Date.sameDate(date_start, date_end)) {
      f.querySelectorAll('.c-DateBlock__Date')[1].remove()
    } else {
      f.querySelectorAll('.c-DateBlock__Date')[0].remove()
    }
    new xjs.HTMLElement(f.querySelector('.c-DateBlock__Date')).trimInner()

    new xjs.HTMLAnchorElement(f.querySelector('a')).attr({
      href    : d.url || null,
      itemprop: (d.url) ? 'url' : null,
    }).textContent(d.name)
  })
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-dateblock.tpl.html'))
  .setRenderer(xDateblock_renderer)
