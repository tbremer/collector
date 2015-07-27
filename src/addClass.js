// ###addClass
// _addClass should take collections and add passed class name if they class name isn't already on the node_
// - **memberof** class api
// - **arg** `string` :: class name to be added to all nodes in collection.
// - **returns** modified collection
//
// ####example
// ```html
// <div class="example">Hello World</div>
// ```
// ```javascript
//  $('.example').addClass('test');
//  ```
//  ```html
// <div class="example test">Hello World</div>
// ```
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
