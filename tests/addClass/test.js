describe('addClass', function() {
  it('should add the class `active`', function() {
    $('#collector-addClass .test').addClass('active');

    expect(document.querySelector('#collector-addClass .test').className).to.equal("test active");
  });

  it('should not duplicate the class `active`', function() {
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');
    $('#collector-addClass .test').addClass('active');

    expect(document.querySelector('#collector-addClass .test').className).to.equal("test active");
  });
});
