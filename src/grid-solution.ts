document.addEventListener('DOMContentLoaded', () => {
  $('[mt-el=variant-width]').each(function () {
    const myclass = $(this).text();
    const mytarget = $(this).parent();
    switch (myclass) {
      case 'big':
        mytarget.css('grid-column', 'span 2');
        break;
      case 'small':
        mytarget.css('grid-column', 'span 1');
        break;
      default:
        break;
    }
  });
});
