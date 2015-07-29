(($) => {
  $.plugin(`children`, function () {
    let kids = [];
    this.each(function(el) {
      kids.push([].slice.call(el.children));
    });

    return $([].concat.apply([], kids));
  });
})(collector);
