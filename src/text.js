// ## text
// _text returns the text of the first matched element_
// - **memberof** contents api
// - **arg** `allContent` [not required]
//   - if `true` returns all text nodes including hidden values (style and script)
// - **returns** String
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
// ```
(function($) {
  $.plugin(`text`, function(allContent) {
    if (allContent === undefined || allContent === false) {
      return this[0].innerText;
    }

    if (allContent === true) {
      return this[0].textContent;
    }
  });
})(collector);
