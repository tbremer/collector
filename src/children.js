// ### children
// _children take a collection of nodes, optionally a selector. returns a group of nodes, if context is passed in the nodes returned are only those that match the context_
// - **memberof** traversal api
// - **arg** `string` :: context to check against childre nodes
// - **returns** collection
//
// #### example
// ```html
// <div class="parent">
//   <div class="child"></div>
//   <div class="child context"></div>
//   <div class="child"></div>
// </div>
// ```
// ```javascript
// $('.parent').children();
// // ['div.child', 'div.child.context', 'div.child']
// $('.parent').children('.context')
// // ['div.child.context']
// ```
(($) => {
  $.plugin(`children`, function (context) {
    let kids = [],
        EP = Element.prototype,
        matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector;

    this.each((el) => {
      if (el !== null) {
        kids.push([].slice.call(el.children));
      }
    });
    kids = [].concat.apply([], kids);

    if (!context) {
      return $(kids);
    }


    return kids.filter((el) => {
      return matches.call(el, context);
    });
  });
})(collector);
