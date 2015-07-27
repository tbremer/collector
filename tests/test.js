var expect = chai.expect;

describe('Collector.js', function() {
  describe('$', function() {
    it('should grab nodes', function() {
      expect($('#collector-selection .test').length).to.equal(6);
    });
  });

  describe('Class API', function() {
    describe('hasClass', function() {
      it('should return false', function() {
        expect($('#collector-hasClass-false div').hasClass('test')).to.equal(false);
      })
      it('should return true', function() {
        expect($('#collector-hasClass-true div').hasClass('test')).to.equal(true);
      });
    });

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
  });
});
