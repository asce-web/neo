const Color = require('extrajs-color')

$('input.js-picker').change(function () {
  var primary = Color.fromString($('input.js-picker-primary').val())
  var secondary = Color.fromString($('input.js-picker-secondary').val())
  var styleobj = require('../../class/ConfSite.class.js').colorStyles(primary, secondary)
  for (var prop in styleobj) {
    document.querySelector('.docs-o-ColorList#docs-colors').style.setProperty(prop, styleobj[prop])
  }
  $('#docs-colors code').each(function () {
    $(this).text(Color.fromString(styleobj[
      $(this).parents('figure').find('[data-prop]').attr('data-prop')
    ]).toString('hex'))
  })
})
