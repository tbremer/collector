describe('hasClass', () => {
  it('should return false', () => {
    expect($('#collector-hasClass-false div').hasClass('test')).to.equal(false);
  });

  it('should return true', () => {
    expect($('#collector-hasClass-true div').hasClass('test')).to.equal(true);
  });
});
