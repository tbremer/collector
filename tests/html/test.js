describe('html', () => {
  it('should return the HTML string', () => {
    let assert = $('#collector-html').html(),
        expected = `<div class="html">Hello World</div>`;

    expect(assert).to.equal(expected);
  });

  it('should set an HTML string', () => {
    $('#collector-html').html(`<div class="html">Goodbye friend</div>`);

    let assert = $('#collector-html').html(),
        expected = `<div class="html">Goodbye friend</div>`;

    expect(assert).to.equal(expected);
  });
})
