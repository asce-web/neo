const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}


/**
 * @summary A `<tr.c-TimeBlock__Item>` subcomponent containing a pair of `<td>`s,
 * marking up this date range as a session with time and name.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {Array<sdo.Event>} data an arry of sessions, each with:
 * @param {string}  data.name the name of the date range
 * @param {string}  data.startDate the start date, in ISO string format
 * @param {string}  data.endDate   the end   date, in ISO string format
 * @param {string=} data.url the url of the session
 * @param {boolean=} data.$is_last whether this data is last in a set
 */
function xTimeblock(frag, data) {
  let [fragment, dataset] = [frag, data] // REVIEW variable naming

  let container = fragment.querySelector('.c-TimeBlock')
  container.append(...dataset.map((datum) =>
    new xjs.HTMLTemplateElement(container.querySelector('template')).setRenderer(function (frag, data) {
      // REVIEW-INDENTATION

  let date_start = new Date(data.startDate)
  let date_end   = (data.endDate) ? new Date(data.endDate) : null

  frag.querySelector('[itemprop="startDate"]').dateTime    = date_start.toISOString()
  frag.querySelector('[itemprop="startDate"]').textContent = xjs.Date.format(date_start, 'g:ia')
  frag.querySelector('[itemprop="endDate"]'  ).dateTime    = date_end.toISOString()
  frag.querySelector('[itemprop="endDate"]'  ).textContent = xjs.Date.format(date_end, 'g:ia')

  new xjs.Element(frag.querySelector('.c-TimeBlock__Desc'))
    .replaceClassString('{{ is_last }}', (data.$is_last) ? 'c-TimeBlock__Desc--last' : '')
  new xjs.HTMLAnchorElement(frag.querySelector('a')).attr({
    href: data.url || null,
    itemprop: (data.url) ? 'url' : null,
  }).textContent(data.name)

    }).render(datum)
  ))
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-timeblock.tpl.html'))
  .setRenderer(xTimeblock)
