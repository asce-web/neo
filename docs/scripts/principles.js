var Color = require('csscolor').Color
var ConfSite = require('../../_models/ConfSite.class.js')

$('input.js-picker').change(function () {
  var primary = Color.fromString($('input.js-picker-primary').val())
  var secondary = Color.fromString($('input.js-picker-secondary').val())
  var styleobj = ConfSite.colorStyles(primary, secondary)
  for (var prop in styleobj) {
    document.querySelector('.docs-o-ColorList#docs-colors').style.setProperty(prop, styleobj[prop])
  }
  $('#docs-colors code').each(function () {
    $(this).text(Color.fromString(styleobj[
      $(this).parents('figure').find('[data-prop]').attr('data-prop')
    ]).toString('hex'))
  })
})
