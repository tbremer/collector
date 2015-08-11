(($) => {
  $.plugin('attr', function(attribute, value) {
    if (!attribute) { return this; }

    if (attribute && value === undefined) {
      if (/^\{(?:.+)\}$/.test(this[0].getAttribute(attribute))) {
        try {
          return (JSON.parse(this[0].getAttribute(attribute)));
        } catch (e) { console.error(e); }
      }
      return (this[0].getAttribute(attribute));
    }

    if (attribute && value) {
      this.each((el) => {
        el.setAttribute(attribute, value);
      });
    }

  });
})(collector);
