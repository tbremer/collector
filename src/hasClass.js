/**
 * API: CLASS
 * hasClass should take a collection
 * should return a collection that matches the given klass
 */
(function($) {
  $.plugin('hasClass', function(klass) {
    return this.some((node) => {
      let cn = node.className,
        reg = new RegExp(klass);

      return (reg.test(cn));
    });
  });
})(domQuery);
