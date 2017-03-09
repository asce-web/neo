function resizeTabBlock() {
  /*
   * number of headings stacked vertically
   * 480 == @media screen and (min-width: 30em)
   */
  var n = ($(window).width() < 480) ? $('.o-Tabs__Tab').length : 1
  $('.o-Tabs').height(function () {
    var current_panel = $(this).find('.o-Tabs__Panel--shown')
    var current_tab = current_panel.prev('.o-Tabs__Tab')
    function totalHeight($jq) {
      return $jq.height()
        + parseInt($jq.css('padding-top'))
        + parseInt($jq.css('margin-bottom'))
    }
    return totalHeight(current_panel) + (n * totalHeight(current_tab))
  })
}
function updateTabs() {
  $(this).parents('.o-Tabs').each(function () {
    $(this).find('.o-Tabs__Tab').removeClass('o-Tabs__Tab--selected')
    $(this).find('.o-Tabs__Panel').removeClass('o-Tabs__Panel--shown o-Tabs__Panel--hiddenBefore o-Tabs__Panel--hiddenAfter').removeAttr('aria-hidden')
      .find('a').removeAttr('tabindex')
  })
  $(this).parents('.o-Tabs__Tab').each(function () {
    $(this).addClass('o-Tabs__Tab--selected')
      .next('.o-Tabs__Panel--js').addClass('o-Tabs__Panel--shown')
    $(this).prevAll('.o-Tabs__Tab').next('.o-Tabs__Panel--js').addClass('o-Tabs__Panel--hiddenBefore').attr('aria-hidden', true).find('a').attr('tabindex', -1)
    $(this).nextAll('.o-Tabs__Tab').next('.o-Tabs__Panel--js').addClass('o-Tabs__Panel--hiddenAfter ').attr('aria-hidden', true).find('a').attr('tabindex', -1)
  })
  resizeTabBlock()
}
$('.o-Tabs .o-Tabs__Panel').addClass('o-Tabs__Panel--js')
$('.o-Tabs .o-Tabs__Check:checked').each(updateTabs)
$('.o-Tabs .o-Tabs__Check').change(updateTabs)
$(window).resize(resizeTabBlock)
