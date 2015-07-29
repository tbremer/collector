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

    return kids.concat.apply([], kids).filter((el) => {
      if(el.nodeType === 1) {
        return matches.call(el, context);
      }
    });
  });
})(collector);
