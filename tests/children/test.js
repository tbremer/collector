/*eslint no-unused-expressions: 0*/

describe('children', () => {
  it('should return children as an instance of Collector', () => {
    expect($('#collector-children-01').children().length).to.equal(6);
    expect($('#collector-children-01').children().children().length).to.equal(3);
    expect($('#collector-children-01').children()).to.be.an.instanceof(Object);
  });

  it('should return empty when no children are present', () => {
    expect($('#collector-children-02').children().length).to.equal(0);
  });

  it('should accept null children and return null results', () => {
    expect($().children()).to.be.an('object');
    expect($().children().length).to.equal(0);
    expect($('#collecton-children-03').children().children().length).to.equal(0);
  });

  it('should take context and pass back elements of that context', () => {
    expect($('#collector-children-01').children('.num-1').length).to.equal(1);
  });

  it('should take context and pass back an empty array if nothing matches', () => {
    expect($('#collector-children-03').children('.notPresent').length).to.equal(0);
  });

  it('should take nested children with context return nodes', () => {
    expect($('#collector-children-01').children().children('.num-1').length).to.equal(1);
    expect($('#collector-children-01').children().children('div').length).to.equal(3);
  });
});
