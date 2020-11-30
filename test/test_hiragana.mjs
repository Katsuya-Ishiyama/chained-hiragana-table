import * as assert from 'assert'
import { Answer } from '../lib/answer.mjs'
import { HiraganaTable } from '../lib/hiragana.mjs'
import { HIRAGANA_LIST } from '../lib/consts.mjs'


describe('HiraganaTable', function() {
  describe('#constructor()', function() {
    it('property hiraganaTable', function() {
      let hiraganaTableList = [];
      for (let x of HIRAGANA_LIST) {
        hiraganaTableList.push([x, new Answer()]);
      }
      let expected = new Map(hiraganaTableList);

      let hiraganaTable = new HiraganaTable();
      let actual = hiraganaTable.hiraganaTable;

      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('#setAnswer()', function() {
    it('throw an Error if target was different to the 1st character of the answer', function() {
      let hiraganaTable = new HiraganaTable();
      assert.throws(() => hiraganaTable.setAnswer('あ', 'かきく'), Error);
    });

    it('should set given answer to an Answer instance in HiraganaTable', function() {
      let hiraganaTable = new HiraganaTable();
      let expected = 'あいう';
      hiraganaTable.setAnswer('あ', expected);

      let actual = hiraganaTable.hiraganaTable.get('あ').answer;

      assert.strictEqual(actual, expected);
    });
  });

  describe('#extractAvailableHiragana()', function() {
    it('should return already answered characters', function() {
      let hiraganaTable = new HiraganaTable();
      hiraganaTable.setAnswer('あ', 'あいう');
      hiraganaTable.setAnswer('か', 'かきく');
      let actual = hiraganaTable.extractAvailableHiragana();

      let hiraganaList = HIRAGANA_LIST.filter((x) => (x !== 'あ') && (x !== 'か'));
      let expected = new Set(hiraganaList);

      assert.deepStrictEqual(actual, expected);
    });

    it('should return empty set when all Hiragana was answered', function() {
      let hiraganaTable = new HiraganaTable();
      for (let x of HIRAGANA_LIST) {
        hiraganaTable.hiraganaTable.get(x).answer = x
      }
      let actual = hiraganaTable.extractAvailableHiragana();
      let expected = new Set();

      assert.deepStrictEqual(actual, expected);
    });
  });
});