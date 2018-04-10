;(function ($) {
$('.o-Drawer__Bar:not(.o-Drawer__Bar--js-open)').find('a').attr('tabindex', -1);
$('.o-Drawer__Button').click(function () {
  var drawer  = $(this).siblings('.o-Drawer__Bar');
  var is_open = $(this).attr('aria-expanded') === 'true';
  drawer
    .toggleClass('o-Drawer__Bar--js-open')
    .attr('aria-hidden',  is_open)
    .find('a').attr('tabindex', (is_open) ? -1 : 0);
  $(this).attr('aria-expanded', !is_open).toggleClass('-ps-f')
    .find('.c-MobileMenuToggle').toggleClass('c-MobileMenuToggle--js-close')
});
})(jQuery)
