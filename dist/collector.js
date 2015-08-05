//     CollectorJS
//     http://collectorjs.com
//     (c) 2015 Tom Bremer / @_tbremer / github.com/tbremer
//     Collector may be freely distributed under the MIT license

'use strict';

(function () {
  var collector = (function () {
    // ## CS
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
      this.concat = Array.prototype.concat;
      this.each = Array.prototype.forEach;
      this.filter = Array.prototype.filter;
      this.indexOf = Array.prototype.indexOf;
      this.length = len;
      this.map = Array.prototype.map;
      this.push = Array.prototype.push;
      this.some = Array.prototype.some;
      this.slice = Array.prototype.slice;
      this.splice = Array.prototype.splice;
    }

    // Simple regex check to see if `string` selectors are simple (contain no spaces)
    function _isSimple(selector) {
      return (/ /g.test(selector) === false
      );
    }

    // Check if a selector is a simple ID.
    function _isSimpleID(selector) {
      return typeof selector === 'string' && _isSimple(selector) && selector[0] === '#';
    }

    // Check if a selector is a simple class.
    function _isSimpleClass(selector) {
      return typeof selector === 'string' && _isSimple(selector) && selector[0] === '.';
    }

    // ## $
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

    //## $.extend
    // - **memberof** core api
    // - **arg** obj `object` -- if only this is included it adds to the $ protoype
    // - **arg** obj2 [not required] `object` -- if two objects are included it merges the second into the first
    //
    //_extend has two purposes_
    //
    //_**first:**_ add functionality to the main `$` prototype, this is the case for `$.ajax` or any global like bindings. You should pass functional extenstions as on `Object` and we will add it into the `$` prototype.
    //#### example:
    //```javascript
    //$.extend({
    //  test: function(str) {
    //    alert(str);
    //    console.info(`test fired!`);
    //  }
    //});
    //```
    //_**second:**_ merge two objects on top of eachother. You should pass your original object as the first argument, and the merging object as the second argument.
    //#### example:
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

    // ## $.plugin
    // _plugin allows functions to be applied to collections. they should only return collections or booleans_
    // - **memberof** core api
    // - **arg** name `string` -- the name of the function that will affect collections
    // - **arg** func `function` -- the function to be applied to collections
    // there are lots of examples through the code on how to use this prototype, however
    //
    // #### example
    // ```javascript
    // (function($){
    //   $.plugin('coolFunction', function() {
    //     // FROM HERE THIS REFERS TO THE COLLECTION.
    //     // TO LOOP NODES:
    //     this.each((el) => {
    //       //do magic
    //     });
    //
    //     // MODIFY THIS
    //     return this
    //    })
    // })(collector)
    //
    // // Now you can use your function to modify nodes.
    // $('body').children().coolFunction();
    // ```
    $.plugin = function (name, func) {
      CS.prototype[name] = func;
    };

    // ## $.matches
    // _matches takes collections (as $(), as individual nodes or as an array of nodes) and a context, it returns a filtered array nodes that match your context, or an empty collection_
    // - **memberof** core api
    // - **arg** collection `collection || array || dom node` -- the set to itterate over
    // - **arg** context `string` -- what nodes get checked against.
    //
    // There are several places where this gets used `[$().children(), $().find(), …]`
    // This could be use as a 2 point `$().hasClass()` function in that it will only return nodes that have whatever context is sent.
    // #### example
    // ```javascript
    // $.matches($('nav a'), '.current')
    // // ['a.current']
    // $.matches($('ul.users .logged-in'), 'a')
    // // ['a.user-link']
    // ```
    $.matches = function (collection, context) {
      if (collection.constructor !== Array && collection instanceof CS === false) {
        collection = [collection];
      }
      var EP = Element.prototype,
          matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector;

      return collection.filter(function (node) {
        if (node !== null && (node.nodeType === 1 || node.nodeType === 9)) {
          return matches.call(node, context);
        }
      });
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

// ### addClass
// _addClass should take collections and add passed class name if they class name isn't already on the node_
// - **memberof** class api
// - **arg** `string` :: class name to be added to all nodes in collection.
// - **returns** modified collection
//
// #### example
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

// ### children
// _children take a collection of nodes, optionally a selector. returns a group of nodes, if context is passed in the nodes returned are only those that match the context_
// - **memberof** traversal api
// - **arg** `string` :: context to check against childre nodes
// - **returns** collection
//
// #### example
// ```html
// <div class="parent">
//   <div class="child"></div>
//   <div class="child context"></div>
//   <div class="child"></div>
// </div>
// ```
// ```javascript
// $('.parent').children();
// // ['div.child', 'div.child.context', 'div.child']
// $('.parent').children('.context')
// // ['div.child.context']
// ```
(function ($) {
  $.plugin('children', function (context) {
    var kids = [];

    this.each(function (el) {
      if (el !== null) {
        kids.push([].slice.call(el.children));
      }
    });
    kids = [].concat.apply([], kids);

    if (!context) {
      return $(kids);
    }

    return $.matches(kids, context);
  });
})(collector);

// ### find
// _find takes a collection and returns children dom nodes that match a passed context, alternatively you can pass an integer and find will return when it has met that number of children._
// - **memberof** traversal api
// - **arg** `string` :: context to check nodes against
// - **arg** `integer` [not required] :: limit the number of returned noeds
// - **returns** collection
//
// #### example
// ```html
// <div class="parent">
//   <div class="child"></div>
//   <div class="child context"></div>
//   <div class="child"></div>
// </div>
// ```
// ```javascript
// $('.parent').find('.child');
// // ['div.child', 'div.child.context', 'div.child']
// $('.parent').children('.child', 2)
// // ['div.child', 'div.child.context']
// ```
(function ($) {
  $.plugin('find', function (context, count) {
    if (!context) {
      return $();
    }
    count = count || null;
    var kids = [];

    this.each(function (el) {
      kids.push([].slice.call(el.getElementsByTagName('*')));
    });

    kids = $.matches(kids.concat.apply([], kids), context);

    if (count !== null) {
      kids = kids.slice(0, count);
    }

    return kids;
  });
})(collector);

// ### hasClass
// _hasClass should return true if any of the nodes contain the class you sent in_
// - **memberof** class api
// - **arg** `string` :: class name to be checked across all nodes in collection.
// - **returns** boolean
//
// #### example
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

// ## html
// _html returns the innerHTML of the first matched element_
// - **memberof** contents api
// - **returns** String
//
// #### example
// ```html
// <nav>
//   <a class="link" href="hello.html">Hello</a>
//   <a class="link" href="world.html">World</a>
// </nav>
// ```
//
// ```javascript
// $('nav').html();
//
// // "<a class="link" href="hello.html">Hello</a>
// // <a class="link" href="world.html">World</a>"
(function ($) {
  $.plugin('html', function () {
    return this[0].innerHTML;
  });
})(collector);

// ### removeClass
// _removeClass should take collections and remove the passed class name on any node that has it_
// - **memberof** class api
// - **arg** `string` :: class name to be removed across all nodes in collection.
// - **returns** modified collection
//
// #### example
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

// ## text
// _text returns the text of the first matched element_
// - **memberof** contents api
// - **arg** `allContent` [not required]
//   - if `true` returns all text nodes including hidden values (style and script)
// - **returns** String
//
// #### example
// ```html
// <div class="test">
//     This is a Test
//     <style>
//     body {
//         color: #131313;
//     }
//     </style>
// </div>
// ```
// ```javascript
// $('.test').text();
// // `This is a Test`
//
// $('.test').text(true);
// //
// //   This is a Test
// //
// //    body {
// //        color: #131313;
// //    }
// //
// ```
(function ($) {
  $.plugin('text', function (allContent) {
    if (allContent === undefined || allContent === false) {
      return this[0].innerText;
    }

    if (allContent === true) {
      return this[0].textContent;
    }
  });
})(collector);