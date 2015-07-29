(($) => {
  let ran = 0;
  $.plugin(`children`, function () {
    ran++;
    let kids = [];
    this.each(function(el) {
      if (el !== null) {
        kids.push([].slice.call(el.children));
      }

    });
    console.log(ran);
    console.log(kids);
    return $([].concat.apply([], kids));
  });
})(collector);
