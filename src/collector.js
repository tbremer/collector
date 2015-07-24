(function() {
  const collector = (function () {

    function $(selector) {
      let collection = (!selector ? [] :
            (typeof selector === 'string') ? document.querySelectorAll(selector) :
            (selector instanceof CS) ? selector :
            (typeof selector === 'object' && (selector.nodeType === 1 || selector.nodeType === 9)) ? [selector] : [] ),
          instance = new CS(collection, selector);

      return instance;
    }

    function CS(collection, selector) {
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

    $.plugin = function (name, func) {
      CS.prototype[name] = func;
    };

    return $;
  })();

  window.$ === undefined && (window.$ = collector);
  window.collector === undefined && (window.collector = collector);
})();
