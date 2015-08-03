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
    let kids = [];

    this.each((el) => {
      kids.push([].slice.call(el.getElementsByTagName('*')));
    });

    kids = $.matches(kids.concat.apply([], kids), context);

    if (count !== null) {
      kids = kids.slice(0, count);
    }

    return kids;
  });
})(collector);
