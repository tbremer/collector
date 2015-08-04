(function($) {
  $.plugin(`text`, function(str) {
    if (str === undefined) {
      return this[0].innerText;
    }

    this.each((node) => {
      node.innerText = str;
    });

    return this;
  });
})(collector);
