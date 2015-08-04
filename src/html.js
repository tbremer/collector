// ## html
// _html takes either null or a string and returns either a string or a modified collection_
// - **memberof** contents api
// - **arg** `str` [not required]
//   - if `null` returns innerText of first matched element
//   - if `string` modifies all matched elements text to match string.
// - **returns** String or Collection
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
//
// $('nav').html('<h1>Hello World</h1>');
// ```
// ```html
// <nav>
//   <h1>Hello World</h1>
// </nav>
// ```
(function($) {
  $.plugin(`html`, function(str) {
    if (str === undefined) {
      return this[0].innerHTML.trim();
    }

    this.each((node) => {
      node.innerHTML = str;
    });

    return this;
  });
})(collector);
