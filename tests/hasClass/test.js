describe('hasClass', function() {
  it('should return false', function() {
    expect($('#collector-hasClass-false div').hasClass('test')).to.equal(false);
  });

  it('should return true', function() {
    expect($('#collector-hasClass-true div').hasClass('test')).to.equal(true);
  });
});
