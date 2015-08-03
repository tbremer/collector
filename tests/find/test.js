/*eslint no-unused-expressions: 0*/
describe('find', function () {
  it('should return empty if no context is passed in', () => {
    let assert = $('#collector-find-01').find().length,
        expected = 0;

    expect(assert).to.equal(expected);
  });

  it('should return all the nodes matching a context', () => {
    let assert = $('#collector-find-01').find('.find-child').length,
        expected = 8;

    expect(assert).to.equal(expected);
  });

  it('should not match outside of it\'s collection', () => {
    let assert = $('#collector-find-01').find('.child-child-child').length,
        expected = 0;

    expect(assert).to.equal(expected);
  });

  it('should take an integer as a secondary argument and return that number of children', () => {
    let assert = $('#collector-find-01').find('.find-child', 2).length,
        expected = 2;


    expect(assert).to.equal(expected);
  })
});
