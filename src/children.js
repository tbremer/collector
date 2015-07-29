(($) => {
  $.plugin(`children`, function (context) {
    let kids = [],
        EP = Element.prototype,
        matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector;

    this.each((el) => {
      if (el !== null && el.children.length !== 0) {
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
