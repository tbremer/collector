describe('attr', () => {
  it('should read attributes', () => {
    var assert = $('#collector-attr-basic').attr('party'),
        expected = 'animal';

    expect(assert).to.be.an.instanceOf(String);
    expect(assert).to.equal(expected);
  });

  it('should write to attributes', () => {
    var assert = $('#collector-attr-basic').attr('party', 'people'),
        expected = 'people';

    expect(assert).to.be.an.instanceOf(String);
    expect(assert).to.equal(expected);
  });

  it('should read output json attributes as JSON data', () => {
    /* eslint quotes:0 */
    var assert = $('#collector-attr-basic').attr('party'),
        expected = {"type": "people", "number": 123, "date": "2015-07-3"};

    expect(assert).to.be.an.instanceOf(Object);
    expect(assert).to.equal(expected);
  });
});
