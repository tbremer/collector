describe('addClass', () => {
  it('should add the class `active`', () => {
    $('#collector-addClass .test').addClass('active');

    expect(document.querySelector('#collector-addClass .test').className).to.equal("test active");
  });

  it('should not duplicate the class `active`', () => {
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');

    expect(document.querySelector('#collector-addClass .test').className).to.equal("test active");
  });
});
