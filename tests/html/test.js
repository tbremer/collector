describe('html', () => {
  it('should return the HTML string', () => {
    let assert = $('#collector-html').html(),
        expected = `
      <div class="html">Hello World</div>
    `;

    expect(assert).to.equal(expected);
  });
});
