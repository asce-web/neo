var Color = require('csscolor').Color
var ConfSite = require('../../../_models/ConfSite.class.js')

$('input.js-picker').change(function () {
  var primary = Color.fromString($('input.js-picker-primary').val())
  var secondary = Color.fromString($('input.js-picker-secondary').val())
  var styleobj = ConfSite.colorStyles(primary, secondary)
  for (var prop in styleobj) {
    document.querySelector('body').style.setProperty(prop, styleobj[prop])
  }
})
