(($) => {
  $.plugin('find', function(context) {
    if (!context) {
      return $();
    }
    let EP = Element.prototype,
        matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector,
        kids = [], _kids;

    this.each((el) => {
      kids.push([].slice.call(el.childNodes));
    });

    kids = kids.concat.apply([], kids);
    kids.filter((el) => {
      console.log(el.nodeType)

      if (el.nodeType === 1) {
        console.log(matches(el, context));
      }

      return (el.nodeType === 1)
    });

    console.log(kids);
  });
})(collector);
