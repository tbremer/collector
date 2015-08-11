describe('attr', () => {
  it('should read attributes', () => {
    var assert = $('#collector-attr-basic').attr('party'),
        expected = 'animal';

    expect(assert).to.be.a('string');
    expect(assert).to.equal(expected);
  });

  it('should return null when attribute does not exist', () => {
    var assert = $('#collector-attr-basic').attr('nope'),
        expected = null;

    expect(assert).to.equal(expected);
  });

  it('should write to attributes', () => {
    $('#collector-attr-basic').attr('party', 'people');

    var assert = $('#collector-attr-basic').attr('party'),
        expected = 'people';

    expect(assert).to.be.a('string');
    expect(assert).to.equal(expected);
  });

  it('should read output json attributes as JSON data', () => {
    /* eslint quotes:0 */
    var assert = $('#collector-attr-json').attr('party'),
        expected = {"type": "people", "number": 123, "date": "2015-07-31"};

    expect(assert).to.be.an('object');
    expect(assert).to.eql(expected);
  });
});
