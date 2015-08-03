// ### find
// _find takes a collection and returns children dom nodes that match a passed context, alternatively you can pass an integer and find will return when it has met that number of children._
// - **memberof** traversal api
// - **arg** `string` :: context to check nodes against
// - **arg** `integer` [not required] :: limit the number of returned noeds
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
// $('.parent').find('.child');
// // ['div.child', 'div.child.context', 'div.child']
// $('.parent').children('.child', 2)
// // ['div.child', 'div.child.context']
// ```
(($) => {
  $.plugin('find', function(context, count) {
    if (!context) {
      return $();
    }
    count = count || null;
    let EP = Element.prototype,
        matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector,
        kids = [], _kids;

    this.each((el) => {
      kids.push([].slice.call(el.childNodes));
    });

    _kids = kids.concat.apply([], kids).filter((el) => {
      if(el.nodeType === 1) {
        return matches.call(el, context);
      }
    });

    if (count !== null) {
      _kids = _kids.slice(0, count);
    }

    return _kids;
  });
})(collector);
