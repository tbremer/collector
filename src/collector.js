(function() {
  const collector = (function () {
    function CS(collection) {
      let i = 0, len = collection.length;
      for(; i < len; i++) {
        this[i] = collection[i];
      }
      this.length = len;
      this.splice = Array.prototype.splice;
      this.each = Array.prototype.forEach;
      this.indexOf = Array.prototype.indexOf;
      this.some = Array.prototype.some;
    }

    function $(selector) {
      let collection = (!selector ? [] :
            (typeof selector === 'string') ? document.querySelectorAll(selector) :
            (selector instanceof CS) ? selector :
            (typeof selector === 'object' && (selector.nodeType === 1 || selector.nodeType === 9)) ? [selector] :
            (selector.constructor === Array) ? selector : [] );

      return new CS(collection);
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

      for(i in obj) {
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

  if (window.$ === undefined) { window.$ = collector; }
  if (window.collector === undefined) { window.collector = collector; }
})();
