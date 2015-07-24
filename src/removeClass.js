/**
 * API: CLASS
 * removeClass takes a collection
 * returns a collection without the desired klass
 */
(function($) {
  $.plugin('removeClass',function(klass) {
    this.each((node) => {
      node.className = node.className.replace(klass, '');
    })

    return this;
  });
})(collector)
