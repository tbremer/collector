describe('children', function() {
  it('should return children as an instance of Collector', function() {
    expect($('#collector-children-01').children().length).to.equal(6);
    expect($('#collector-children-01').children().children().length).to.equal(3);
  });

  it('should return empty when no children are present', function() {
    /*eslint no-unused-expressions: 0*/
    expect($('#collector-children-02').children().length).to.be.empty;
    expect($('#collector-children-02').children().length).to.equal(0);
  });
});
