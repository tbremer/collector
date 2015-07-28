//     CollectorJS
//     http://collectorjs.com
//     (c) 2015 Tom Bremer - @_tbremer - github.com/tbremer
//     Collector may be freely distributed under the MIT license

(function() {
  const collector = (function() {
    // ###CS
    // _this is our factory for binding any itteratable functions to._
    //
    // CS transforms collections into the functional suite.
    // All plugins modify CS' prototype chain.
    function CS(collection) {
      let i = 0,
        len = collection.length;
      for(; i < len; i++) {
        this[i] = collection[i];
      }
      this.length = len;
      this.splice = Array.prototype.splice;
      this.each = Array.prototype.forEach;
      this.indexOf = Array.prototype.indexOf;
      this.some = Array.prototype.some;
    }

    // Simple regex check to see if `string` selectors are simple (contain no spaces)
    function _isSimple(selector) {
      return (/ /g.test(selector) === false);
    }

    // Check if a selector is a simple ID.
    function _isSimpleID(selector) {
      return (
        (typeof selector === `string`) &&
        (_isSimple(selector)) &&
        (selector[0] === `#`)
      );
    }

    // Check if a selector is a simple class.
    function _isSimpleClass(selector) {
      return (
        (typeof selector === `string`) &&
        (_isSimple(selector)) &&
        (selector[0] === `.`)
      );
    }

    // ###$
    // _this is our main entrypoint for most users / use cases._
    // - **arg** `string | collection | HTML Element` :: selector css selector, dom node, or previously built collection.
    // - **returns** `factory` :: new instance of CS
    function $(selector) {
      let collection, cleanedSelector;

      if(typeof selector === `string`) { cleanedSelector = selector.slice(1); }

      collection = (!selector ? [] :
            (typeof selector === `string`) ? (((_isSimpleID(selector)) ? [document.getElementById(cleanedSelector)] : (_isSimpleClass(selector)) ? document.getElementsByClassName(cleanedSelector) : document.querySelectorAll(selector) )) :
            (selector instanceof CS) ? selector :
            (typeof selector === `object` && (selector.nodeType === 1 || selector.nodeType === 9)) ? [selector] :
            (selector.constructor === Array) ? selector : [] );

      return new CS(collection);
    }

    //###$.extend
    //_extend has two purposes_
    //
    //_**first:**_ add functionality to the main `$` prototype, this is the case for `$.ajax` or any global like bindings. You should pass functional extenstions as on `Object` and we will add it into the `$` prototype.
    //####example:
    //```javascript
    //$.extend({
    //  test: function(str) {
    //    alert(str);
    //    console.info(`test fired!`);
    //  }
    //});
    //```
    //_**second:**_ merge two objects on top of eachother. You should pass your original object as the first argument, and the merging object as the second argument._
    //####example:
    //```javascript
    //let merged = $.extend({foo: 'bar'}, {hello: 'world'});
    ////{foo: 'bar', hello: 'world'}
    //```
    $.extend = function (obj) {
      let _this = this, i;
      if (arguments.length > 2) {
        return Error(`$.extend expects at most 2 arguments. Old object and New object`);
      }
      if (arguments.length > 1) {
        _this = arguments[0];
        obj = arguments[1];
      }

      for(i in obj) {
        if(obj.hasOwnProperty(i)) {
          _this[i] = obj[i];
        }
      }

      return _this;
    };

    $.plugin = function (name, func) {
      CS.prototype[name] = func;
    };

    return $;
  })();

  if (window.$ === undefined) { window.$ = collector; }
  if (window.collector === undefined) { window.collector = collector; }
})();
