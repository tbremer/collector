// ## text
// _text takes either null or a string and returns either a string or a modified collection_
// - **memberof** contents api
// - **arg** `str` [not required]
//   - if `null` returns innerText of first matched element
//   - if `true` returns all text nodes including hidden values (style and script)
//   - if `string` modifies all matched elements text to match string.
// - **returns** String or collection
//
// #### example
// ```html
// <div class="test">
//     This is a Test
//     <style>
//     body {
//         color: #131313;
//     }
//     </style>
// </div>
// ```
// ```javascript
// $('.test').text();
// // `This is a Test`
//
// $('.test').text(true);
// //
// //   This is a Test
// //
// //    body {
// //        color: #131313;
// //    }
// //
//
// $('.test').text('Hello World!')
// // ['div.test']
// ```
(function($) {
  $.plugin(`text`, function(str) {
    if (str === undefined || str === false) {
      return this[0].innerText;
    }

    if (str === true) {
      return this[0].textContent;
    }

    this.each((node) => {
      node.innerText = str;
    });

    return this;
  });
})(collector);
