describe('closest', () => {
  it('should return an Collection if no context is sent', () => {
    let assert = $('#collector-closest li').closest(),
        expected = $();

    expect(assert).to.be.an('object');
    expect(assert).to.eql(expected);
  });

  it('should return a single node that matches', () => {
    let assert = $('#collector-closest li').closest('ul').hasClass('parent'),
        expected = true;

    expect(assert).to.equal(expected);

    assert = $('#collector-closest li').closest('#collector-closest').hasClass('grandparent');
    expected = true;

    expect(assert).to.equal(expected);


  });

  it('should return an Collection if there are no matches', () => {
    let assert = $('#collector-closest li').closest('a'),
        expected = $();

    expect(assert).to.be.an('object');
    expect(assert).to.eql(expected);
  });
});
