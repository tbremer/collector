//     CollectorJS
//     http://collectorjs.com
//     (c) 2015 Tom Bremer / @_tbremer / github.com/tbremer
//     Collector may be freely distributed under the MIT license

(function() {
  const collector = (function() {
    // ## CS
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
      this.each = Array.prototype.forEach;
      this.filter = Array.prototype.filter;
      this.indexOf = Array.prototype.indexOf;
      this.length = len;
      this.some = Array.prototype.some;
      this.splice = Array.prototype.splice;
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

    // ## $
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
    $.matches = function(collection, context) {
      if(collection.constructor !== Array && collection instanceof CS === false) {
        collection = [collection];
      }
      let EP = Element.prototype,
          matches = EP.matches || EP.webkitMatchesSelector || EP.mozMatchesSelector || EP.msMatchesSelector;

      return collection.filter((node) => {
        if (node !== null && (node.nodeType === 1 || node.nodeType === 9)) {
          return matches.call(node, context);
        }
      });
    };

    return $;
  })();

  if (window.$ === undefined) { window.$ = collector; }
  if (window.collector === undefined) { window.collector = collector; }
})();
