import * as assert from 'assert'
import * as sinon from 'sinon'
import { Player } from '../lib/player.mjs'

describe('Player', function() {
  let corpus = 'a';

  describe('#constructor()', function() {
    it('check an instance has attributes to be assumed.', function() {
      let expectedCorpus = corpus;
      let expectedLastAnswer = '';
      let player = new Player(expectedCorpus);

      assert.strictEqual(player.corpus, expectedCorpus);
      assert.strictEqual(player.lastAnswer, expectedLastAnswer);
    });
  });

  describe('#makeAnswer()', function() {
    it('should call searchAnswerCandidates()', function() {
      let player = new Player(corpus);
      let spy = sinon.spy(player, 'searchAnswerCandidates');

      let answer = player.makeAnswer();
      assert.strictEqual(spy.callCount, 1);
    });
  });

  describe('#searchAnswerCandidates()', function() {
    let availableHiragana = new Set(['あ']);

    let player = new Player(corpus);
    let actual = player.searchAnswerCandidates(availableHiragana);
    let expected = new Map([
      ['あ', ['あいち', 'あーもんど']]
    ]);

    assert.strictEqual(actual, expected);
  });
});