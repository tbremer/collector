/*global chai*/
let expect = chai.expect;

describe('$', () => {
  it('should grab nodes', () => {

    expect($()).to.be.instanceOf(Object);
    expect($('#collector-selection .test').length).to.equal(6);
  });

  it('should accept collections', () => {
    var collection = $('#collector-selection');

    expect($()).to.be.instanceOf(Object);
    expect($(collection).length).to.equal(1);
  });

  it('should return empty when sent nothing', () => {
    expect($()).to.be.instanceOf(Object);
    expect($().length).to.equal(0);
  });
});

describe('$.extend', () => {
  it('should extend the base $ class', () => {
    $.extend({
      timesTwo: function(n) {
        return (n * 2);
      }
    });

    expect(typeof $.timesTwo).to.equal('function');
    expect($.timesTwo(2)).to.equal(4);
  });

  it('should merge two objects', () => {
    let obj1 = {test: 'object'};
    let obj2 = {hello: 'world'};
    let assert = $.extend(obj1, obj2);
    let expected = {
      test: 'object',
      hello: 'world'
    };

    expect(typeof assert).to.equal('object');
    expect(typeof assert).to.equal(typeof expected);
    expect(assert).to.deep.equal(expected);
  });
});

describe('$.plugin', () => {
  it('should modify the Collector prototype', () => {
    let initialLength = Object.keys(Object.getPrototypeOf($())).length;

    $.plugin('test', function() {
      return true;
    });

    expect($()).to.be.an.instanceOf(Object);
    expect(typeof $().test).to.equal('function');
    expect(Object.keys(Object.getPrototypeOf($())).length).to.equal(++initialLength);
    expect($().test()).to.equal(true);
  });
});
