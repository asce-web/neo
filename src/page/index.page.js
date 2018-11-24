const path = require('path')

const xjs = require('extrajs-dom')
/**
 * @todo    TODO put in template-processor
 * @param   {Document} doc [description]
 * @param   {ProcessingFunction_Document<V, W>} instructions [description]
 * @param   {V} data [description]
 * @param   {W} options [description]
 * @param   {unknown} this_arg [description]
 * @returns {Document} [description]
 */
async function Processor_processAsync_Document(doc, instructions, data, options = {}, this_arg = null) {
	await instructions.call(this_arg, doc, data, options)
	return doc
}
const {xAddress} = require('aria-patterns')
const requireOther = require('schemaorg-jsd/lib/requireOther.js')

const Util                  = require('../../class/Util.class.js')
const xHero                 = require('../../tpl/x-hero.tpl.js')
const xListHighlightbuttons = require('../../tpl/x-list-highlightbuttons.tpl.js')
const xListSupporterLevel   = require('../../tpl/x-list-supporter-level.tpl.js')
const xSitetitle            = require('../../tpl/x-sitetitle.tpl.js')

const doc = xjs.Document.fromFileSync(path.join(__dirname, '../../tpl/master.tpl.html')).node
const data = requireOther(path.join(__dirname, '../../proto/asce-event.org/database.jsonld'))


async function instructions(document/*: Document*/, data/*: ConfSite*/, opts/*: object*/)/*: Promise<void>*/ {
	const site = new (require('../../class/ConfSite.class.js'))(data).init() // TEMP for now

	await new xjs.Document(document).importLinksAsync(path.join(__dirname, '../../tpl/'))

	// head metadata
	document.title = data.name
	document.head.querySelector('meta[name="description"]').content = data.description
	document.head.querySelector('meta[name="keywords"]'   ).content = data.keywords.join()

	// site headers and footers
	document.querySelector('header.c-Mast--head > .h-Constrain template'    ).after(xSitetitle.render(data))
	document.querySelector('#connect-with-asce address [itemprop="address"]').append(xAddress.render(data.brand.address))
	document.querySelector('#main-menu-drawer').innerHTML = Util.view(site).pageToc({
		depth: 1,
		end: -1,
		classes: {
			list: 'o-List o-Flex c-MainMenu',
			item: 'o-List__Item o-Flex__Item c-MainMenu__Item',
		},
		links: {
			classes: {
				link  : 'c-MainMenu__Link h-Block',
				icon  : 'c-MainMenu__Icon',
				expand: 'c-MainMenu__Exp',
			},
		},
		options: {
			classes: {
				list: 'o-List c-MainMenu__Sub',
				item: 'o-List__Item c-MainMenu__Sub__Item',
			},
			links: { classes: { link: 'c-MainMenu__Sub__Link h-Block' } },
		},
	})
	document.querySelector('#sitemap > nav').innerHTML = `<h1 class="h-Hidden">Sitemap</h1>` + Util.view(site).pageToc({
		depth: Infinity,
		start: 1,
		classes: {
			list: 'o-List o-Flex c-Sitemap',
			item: 'o-List__Item o-Flex__Item c-Sitemap__Item',
		},
		options: {
			classes: {
				list: 'o-List c-Sitemap__Sub',
				item: 'o-List__Item c-Sitemap__Sub__Item',
			},
		},
	})

	// page main
	let conference/*: Conference*/ = data.$conferences[0]
	function itemsInQueue(queue_name/*: string*/)/*: (Thing|ListItem|string)[]*/ {
		let queue/*: Queue|null*/ = (data.$queues || []).find((list) => list.name===queue_name) || null
		return queue && queue.itemListElement || []
	}
	document.querySelector('slot[name="mainHeader"] template').after(
		xHero.render({
			...conference,
			location: conference.location && conference.location[0] || { "@type": "PostalAddress" },
		})
	)
	document.querySelector('#sponsors template').after(
		xListSupporterLevel.render({ supporterlevels: itemsInQueue('Top Sponsors'), small: true }, conference)
	)
	document.querySelector('#sponsors footer template').after(
		xListHighlightbuttons.render({
			links: JSON.parse(document.querySelector('#sponsors footer script').innerHTML),
		})
	)
	document.querySelector('main > article > aside:last-child template').after(
		xListSupporterLevel.render({ supporterlevels: itemsInQueue('Non-Sponsors'), small: true }, conference)
	)
}

module.exports = Processor_processAsync_Document(doc, instructions, data)






// const blocks = {
// 	homepage: {
// 		'meta?description': new Processor(xjs_HTMLTemplateElement_fromString(`
// 			<meta name="description" content="{{ page.description }}"/>
// 		`), function (frag, data, options) {
// 			frag.querySelector('meta[name="description"]').content = data.description
// 		})
// 	}
// }
//
//
// for (let slotname in blocks.homepage) {
// 	document.querySelector(`slot[name="${slotname}"]`).append(blocks.homepage[slotname].process(data, options, this_arg))
// }
