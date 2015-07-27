describe('$', () => {
  it('should grab nodes', () => {
    expect($('#collector-selection .test').length).to.equal(6);
  });

  it('should accept collections', () => {
    var collection = $('#collector-selection');

    expect($(collection).length).to.equal(1);
  });
});
