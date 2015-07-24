/**
 * API: CLASS
 * addClass should take collection
 * add passed class name if they don't already exist
 * return collection
 */
(function($){
  $.plugin('addClass', function(klass) {
    this.each(function (node) {
      if ($(node).hasClass(klass) === false) {
        node.className += ` ${klass}`;
      };
    });

    return this;
  })
})(collector);
