// ## attr
// _closest takes a context and returns a Collection containing the first matching element of the context. If no match is found it returns an empty Collection_
// - **memberof** traversal api
// - **returns** Collection
//
// #### example
// ```html
// <ul id="one" class="level-1">
//   <li class="item-i">I</li>
//   <li id="ii" class="item-ii">II
//     <ul class="level-2">
//       <li class="item-a">A</li>
//       <li class="item-b">B
//         <ul class="level-3">
//           <li class="item-1">1</li>
//           <li class="item-2">2</li>
//           <li class="item-3">3</li>
//         </ul>
//       </li>
//       <li class="item-c">C</li>
//     </ul>
//   </li>
//   <li class="item-iii">III</li>
// </ul>
// ```
// ```javascript
// $( "li.item-a" ).closest( "ul" )
// // [<ul class="level-2">…</ul>]
// ```
(($) => {
  $.plugin('closest', function(context) {
    let allMatching = [];
    this.some((node) => {
      let running = true;
      while(running) {
        let parent = node.parentNode, matches;

        if (parent.nodeType === 9) {
          return false;
        }

        matches = $.matches(parent, context);
        if (matches.length > 0) {
          running = false;
          allMatching.push(matches[0]);
          return true;
        } else {
          node = node.parentNode;
        }
      }
    });

    return $(allMatching[0]);
  });
})(collector);
