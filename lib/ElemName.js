const jsdom = require('jsdom')
const xjs = require('extrajs-dom')

const window = new jsdom.JSDOM('').window
const {document} = window


module.exports = (str) => new xjs.HTMLElement(document.createElement(str))
