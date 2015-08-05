describe('text', () => {
  it('should return a text string', () => {
    let assert = $('#collector-text').text(),
        expected = `Hello World`;

    expect(assert).to.equal(expected);
  });


  it('should return all text nodes if `true` is passed in', () => {
    let assert = $('#collector-text-all').text(true).replace(/\n/g, ''),
        expected = `      Hello world.              console.log('test')                    body {          background-color: #fff;        }          `;

    expect(assert).to.equal(expected);
  });
});
