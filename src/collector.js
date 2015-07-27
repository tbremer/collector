//     CollectorJS
//     http://collectorjs.com
//     (c) 2015 Tom Bremer -- @_tbremer -- github.com/tbremer
//     Collector may be freely distributed under the MIT license

(function() {
  const collector = (function () {
    // ###CS
    // _this is our factory for binding any itteratable functions to._
    //
    // CS accepts strings, collections, arrays sent from the `$` function
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

    function _isSimple(selector) {
      return (/ /g.test(selector) === false);
    }

    function _isSimpleID(selector) {
      return (
        (typeof selector === 'string') &&
        (_isSimple(selector)) &&
        (selector[0] === '#')
      );
    }

    function _isSimpleClass(selector) {
      return (
        (typeof selector === 'string') &&
        (_isSimple(selector)) &&
        (selector[0] === '.')
      );
    }

    // /**
    //  * @function $
    //  * @description this is our main entrypoint for most users / use cases.
    //  * @arg  {string|collection|domnode} selector css selector, dom node, or previously built collection.
    //  * @return {factory} instance of CS
    //  */
    function $(selector) {
      let collection, cleanedSelector;

      if(typeof selector === 'string') { cleanedSelector = selector.slice(1); }

      collection = (!selector ? [] :
            (typeof selector === 'string') ? (((_isSimpleID(selector)) ? [document.getElementById(cleanedSelector)] : (_isSimpleClass(selector)) ? document.getElementsByClassName(cleanedSelector) : document.querySelectorAll(selector) )) :
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
