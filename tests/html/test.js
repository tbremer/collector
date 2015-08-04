describe('html', () => {
  it('should return the HTML string', () => {
    let assert = $('#collector-html').html(),
        expected = `<div class="html">Hello World</div>`;

    expect(assert).to.equal(expected);
  });

  it('should set an HTML string', () => {
    $('#collector-html').html('1234');

    let assert = $('#collector-html').html(),
        expected = '1234';

    expect(assert).to.equal(expected);
  });
})
