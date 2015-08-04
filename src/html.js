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
