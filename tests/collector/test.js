describe('$', function() {
  it('should grab nodes', function() {
    expect($('#collector-selection .test').length).to.equal(6);
  });
});
