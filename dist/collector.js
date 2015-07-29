//     CollectorJS
//     http://collectorjs.com
//     (c) 2015 Tom Bremer - @_tbremer - github.com/tbremer
//     Collector may be freely distributed under the MIT license

'use strict';

(function () {
  var collector = (function () {
    // ###CS
    // _this is our factory for binding any itteratable functions to._
    //
    // CS transforms collections into the functional suite.
    // All plugins modify CS' prototype chain.
    function CS(collection) {
      var i = 0,
          len = collection.length;
      for (; i < len; i++) {
        this[i] = collection[i];
      }
      this.each = Array.prototype.forEach;
      this.filter = Array.prototype.filter;
      this.indexOf = Array.prototype.indexOf;
      this.length = len;
      this.some = Array.prototype.some;
      this.splice = Array.prototype.splice;
    }

    // Simple regex check to see if `string` selectors are simple (contain no spaces)
    function _isSimple(selector) {
      return / /g.test(selector) === false;
    }

    // Check if a selector is a simple ID.
    function _isSimpleID(selector) {
      return typeof selector === 'string' && _isSimple(selector) && selector[0] === '#';
    }

    // Check if a selector is a simple class.
    function _isSimpleClass(selector) {
      return typeof selector === 'string' && _isSimple(selector) && selector[0] === '.';
    }

    // ###$
    // _this is our main entrypoint for most users / use cases._
    // - **arg** `string | collection | HTML Element` :: selector css selector, dom node, or previously built collection.
    // - **returns** `factory` :: new instance of CS
    function $(selector) {
      var collection = undefined,
          cleanedSelector = undefined;

      if (typeof selector === 'string') {
        cleanedSelector = selector.slice(1);
      }

      collection = !selector ? [] : typeof selector === 'string' ? _isSimpleID(selector) ? [document.getElementById(cleanedSelector)] : _isSimpleClass(selector) ? document.getElementsByClassName(cleanedSelector) : document.querySelectorAll(selector) : selector instanceof CS ? selector : typeof selector === 'object' && (selector.nodeType === 1 || selector.nodeType === 9) ? [selector] : selector.constructor === Array ? selector : [];

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
      var _this = this,
          i = undefined;
      if (arguments.length > 2) {
        return Error('$.extend expects at most 2 arguments. Old object and New object');
      }
      if (arguments.length > 1) {
        _this = arguments[0];
        obj = arguments[1];
      }

      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          _this[i] = obj[i];
        }
      }

      return _this;
    };

    //####TODO: Write documentation on $.plugin
    $.plugin = function (name, func) {
      CS.prototype[name] = func;
    };

    return $;
  })();

  if (window.$ === undefined) {
    window.$ = collector;
  }
  if (window.collector === undefined) {
    window.collector = collector;
  }
})();

// ###addClass
// _addClass should take collections and add passed class name if they class name isn't already on the node_
// - **memberof** class api
// - **arg** `string` :: class name to be added to all nodes in collection.
// - **returns** modified collection
//
// ####example
// ```html
// <div class="example">Hello World</div>
// ```
// ```javascript
//  $('.example').addClass('test');
//  ```
//  ```html
// <div class="example test">Hello World</div>
// ```
(function ($) {
  $.plugin('addClass', function (klass) {
    this.each(function (node) {
      if ($(node).hasClass(klass) === false) {
        node.className += ' ' + klass;
      }
    });

    return this;
  });
})(collector);

(function ($) {
  $.plugin('children', function (context) {
    var kids = [],
        EP = Element.prototype,
        matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector;

    this.each(function (el) {
      if (el !== null) {
        kids.push([].slice.call(el.children));
      }
    });
    kids = [].concat.apply([], kids);

    if (!context) {
      return $(kids);
    }

    return kids.filter(function (el) {
      return matches.call(el, context);
    });
  });
})(collector);

(function ($) {
  $.plugin('find', function (context) {
    if (!context) {
      return $();
    }
    var EP = Element.prototype,
        matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector,
        kids = [],
        _kids = undefined;

    this.each(function (el) {
      kids.push([].slice.call(el.childNodes));
    });

    return kids.concat.apply([], kids).filter(function (el) {
      if (el.nodeType === 1) {
        return matches.call(el, context);
      }
    });
  });
})(collector);

//  ###hasClass
//  _hasClass should return true if any of the nodes contain the class you sent in_
//  - **memberof** class api
//  - **arg** `string` :: class name to be checked across all nodes in collection.
//  - **returns** boolean
//
//  ####example
//  ```html
//  <div class="test active">Hello World</div>
//  ```
//  ```javascript
//  $('.test').hasClass('active');
//  // true
//  ```
(function ($) {
  $.plugin('hasClass', function (klass) {
    return this.some(function (node) {
      var cn = node.className,
          reg = new RegExp(klass);

      return reg.test(cn);
    });
  });
})(collector);

// ###removeClass
// _removeClass should take collections and remove the passed class name on any node that has it_
// - **memberof** class api
// - **arg** `string` :: class name to be removed across all nodes in collection.
// - **returns** modified collection
//
// ####example
// ```html
// <div class="example test">Hello World</div>
// ```
// ```javascript
// $('.example').removeClass('test')
// ```
// ```html
// <div class="example">Hello World</div>
// ```
(function ($) {
  $.plugin('removeClass', function (klass) {
    this.each(function (node) {
      node.className = node.className.replace(klass, '').trim();
    });

    return this;
  });
})(collector);