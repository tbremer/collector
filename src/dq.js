(function() {
  const domQuery = (function () {

    function $(selector) {
      let collection = ((typeof selector === 'string') ? document.querySelectorAll(selector) :
            (typeof selector === 'object' && (selector.nodeType === 1 || selector.nodeType === 9)) ? [selector] : [] ),
          instance = new DQ(collection, selector);

      return instance;
    }

    // This is our functional factory
    function DQ(collection, selector) {
      let i = 0,
          len = collection.length;

      for (;i<len;i++) {
        this[i] = collection[i];
      }

      this.length = len;
      this.splice = [].splice;
      this.each = [].forEach;
      this.indexOf = [].indexOf;
      this.some = [].some;
    }

    // $.extend allows plugins to work on top of our existing base.
    $.extend = function (obj) {
      let that = this, i;
      if (arguments.length > 2) {
        return Error('$.extend expects at most 2 arguments. Old object and New object');
      }
      if (arguments.length > 1) {
        that = arguments[0];
        obj = arguments[1];
      }

      for(let i in obj) {
        if(obj.hasOwnProperty(i)) {
          that[i] = obj[i];
        }
      }
    };
    // $.plugin and $.extend are very similar, however plugin applies only to nodes.
    $.plugin = function (name, func) {
      DQ.prototype[name] = func;
    };

    return $;
  })();

  window.$ === undefined && (window.$ = domQuery);
  window.domQuery === undefined && (window.domQuery = domQuery);
})();
