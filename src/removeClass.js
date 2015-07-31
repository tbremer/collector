// ### removeClass
// _removeClass should take collections and remove the passed class name on any node that has it_
// - **memberof** class api
// - **arg** `string` :: class name to be removed across all nodes in collection.
// - **returns** modified collection
//
// #### example
// ```html
// <div class="example test">Hello World</div>
// ```
// ```javascript
// $('.example').removeClass('test')
// ```
// ```html
// <div class="example">Hello World</div>
// ```
(function($) {
  $.plugin(`removeClass`, function(klass) {
    this.each((node) => {
      node.className = node.className.replace(klass, ``).trim();
    });

    return this;
  });
})(collector);
