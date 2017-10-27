$('.o-Drawer__Button').click(function () {
  var drawer = $(this).siblings('.o-Drawer__Bar');
  var is_open = drawer.attr('aria-expanded') === 'true';
  drawer
    .toggleClass('o-Drawer__Bar--js-open')
    .attr('aria-expanded', !is_open)
    .attr('aria-hidden'  ,  is_open);
  $(this).toggleClass('-ps-f')
    .find('.c-MobileMenuToggle').toggleClass('c-MobileMenuToggle--js-close')
});
