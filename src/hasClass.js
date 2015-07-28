//  ###hasClass
//  _hasClass should return true if any of the nodes contain the class you sent in_
//  - **memberof** class api
//  - **arg** `string` :: class name to be checked across all nodes in collection.
//  - **returns** boolean
//
//  ####example
//  ```html
//  <div class="test active">Hello World</div>
//  ```
//  ```javascript
//  $('.test').hasClass('active');
//  // true
//  ```
(function($) {
  $.plugin(`hasClass`, function(klass) {
    return this.some((node) => {
      let cn = node.className,
        reg = new RegExp(klass);

      return (reg.test(cn));
    });
  });
})(collector);
