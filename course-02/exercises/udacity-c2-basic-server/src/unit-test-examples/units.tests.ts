import { add, divide, concatenate } from './units';

import { expect } from 'chai';
import 'mocha';

describe('add function', () => {

  it('should add two and two', () => {
    const result = add(2,2);
    expect(result).to.equal(4);
  });

  it('should add -2 and two', () => {
    const result = add(-2,2);
    expect(result).to.equal(0);
  });

});

describe('divide', () => {

  it('should divide 6 by 3', () => {
    const result = divide(6,3);
    expect(result).to.equal(2);
  });

  it('should divide 5 and 2', () => {
    const result = divide(5,2);
    expect(result).to.equal(2.5);
  });

  it('should throw an error if div by zero', () => {
    expect(()=>{ divide(5,0) }).to.throw('div by 0')
  });

});

describe("concat", () => {
  it("should concatenate 3 strings 'Hello'and 'World'", ()=> {
    const result = concatenate("Hello ", "World");
    expect(result).to.equal("Hello World");
  });

  it("should throw an error when method get empty strings", () => {       
    expect(() => {concatenate("", "World")}).to.throw('empty strings not allowed')
  });

});