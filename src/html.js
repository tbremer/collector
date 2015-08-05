// ## html
// _html returns the innerHTML of the first matched element_
// - **memberof** contents api
// - **returns** String
//
// #### example
// ```html
// <nav>
//   <a class="link" href="hello.html">Hello</a>
//   <a class="link" href="world.html">World</a>
// </nav>
// ```
//
// ```javascript
// $('nav').html();
//
// // "<a class="link" href="hello.html">Hello</a>
// // <a class="link" href="world.html">World</a>"
(function($) {
  $.plugin(`html`, function() {
    return this[0].innerHTML;
  });
})(collector);
