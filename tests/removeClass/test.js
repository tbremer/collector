describe('removeClass', () => {
  let $selector = $('#collector-removeClass .test');

  it('should remove classes that are present', () => {
    $selector.removeClass('active');
    expect(document.querySelector('#collector-removeClass .test').className).to.equal('test');
  });

  it('should not modify other classes', () => {
    expect($selector.hasClass('test')).to.equal(true);
  });

  it('should return a Collection', () => {
    expect($selector).to.be.instanceOf(Object);
  });
});
