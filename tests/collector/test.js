describe('$', () => {
  it('should grab nodes', () => {
    expect($('#collector-selection .test').length).to.equal(6);
  });
});
