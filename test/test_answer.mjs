import * as assert from 'assert'
import { Answer } from '../lib/answer.mjs'

describe('Answer', function() {
  describe('#constructor()', function() {
    it('property answer should be accessible', function() {
      let expected = 'あいう';
      let actual = new Answer(expected);
      assert.strictEqual(actual.answer, expected);
    });

    it('property answer is set to be empty string if no argument was given', function() {
      let expected = '';
      let answer = new Answer();
      let actual = answer.answer;
      assert.strictEqual(actual, expected);
    });
  });

  describe('#answer', function() {
    it('should be able to assign a string to answer property', function() {
      let ans = new Answer('あいう');
      let expected = 'かきく';

      ans.answer = expected;
      let actual = ans.answer;
      assert.strictEqual(actual, expected);
    });
  });

  describe('#isEmpty()', function() {
    it('should return true if Answer was instantiated with no argument.', function () {
      let answer = new Answer();
      assert.strictEqual(answer.isEmpty(), true);
    });

    it('should return false if Answer was instantiated with a strings.', function () {
      let answer = new Answer('あいう');
      assert.strictEqual(answer.isEmpty(), false);
    });
  });

  describe('#getFirstCharacter()', function() {
    it('should get the 1st character', function () {
        let testedString = 'あいう';
        let expected = 'あ';
        let answer = new Answer(testedString);
        assert.strictEqual(answer.getFirstCharacter(), expected);
    });

    it('should throw an error if an empty string was given', function () {
        let testedString = '';
        let answer = new Answer(testedString);
        assert.throws(answer.getFirstCharacter, TypeError);
    });
  });

  describe('#getLastCharacter()', function() {
    it('should get the tail character', function () {
        let testedString = 'あいう';
        let expected = 'う';
        let answer = new Answer(testedString);
        assert.strictEqual(answer.getLastCharacter(), expected);
    });

    it('should throw an error if an empty string was given', function () {
        let testedString = '';
        let answer = new Answer(testedString);
        assert.throws(answer.getLastCharacter, TypeError);
    });
  });
});