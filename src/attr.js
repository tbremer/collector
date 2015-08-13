// ## attr
// _attr returns either null, the value the first matched element's given attribute (if that attribute is `JSON.parse()`able it will return a JSON object) or a collection_
// - **memberof** attribute api
// - **returns** Null || String || Object || Collection
// #### example
// ```html
// <article id="collector-attr-basic" party="animal"></article>
// ```
// ```javascript
// $('#collector-attr-basic').attr('party');
// // "animal"
// $('#collector-attr-basic').attr('party', 'people');
// $('#collector-attr-basic').attr('party');
// // "people"
// ```
// ```html
// <article id="collector-attr-json" party='{"type": "people", "number": 123, "date": "2015-07-31"}'></article>
// ```
// ```javascript
// $('#collector-attr-json').attr('party');
// // {"type": "people", "number": 123, "date": "2015-07-31"}
// ```
(($) => {
  $.plugin('attr', function(attribute, value) {
    if (!attribute) { return this; }

    if (value === undefined) {
        try {
          return (JSON.parse(this[0].getAttribute(attribute)));
        } catch (e) {
          return (this[0].getAttribute(attribute));
        }
    }

    this.each((el) => {
      el.setAttribute(attribute, value);
    });

  });
})(collector);
