import chai from 'chai'
import { dirSync } from 'tmp';
import { listFiles, checkCharIsHiragana } from '../lib/utils.mjs';

describe("listFiles", function() {
  var tmpobj = dirSync();

  // TODO: 実装する
  before(function() {
    console.log('Dir: ', tmpobj.name);
  });

  // TODO: 実装する
  it('test', function() {
    console.log('test');
  });

  // TODO: 実装する
  after(function() {
    tmpobj.removeCallback();
  });
});

describe('checkCharIsHiragana', function() {
  it('should return true if passed a hiragana.', function() {
    let actual = checkCharIsHiragana('あ');
    chai.expect(actual).to.be.true;
  });

  it('should return false if passed a character except for Hiragana.', function() {
    let actual = checkCharIsHiragana('a');
    chai.expect(actual).to.be.false;
  });
});