(($) => {
  $.plugin('find', function(context) {
    if (!context) {
      return $();
    }

    console.log('find…');

    let EP = Element.prototype,
        matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector;

    this.filter((el) => {
      console.log(el);
    });
    console.log('')
  });
})(collector);
