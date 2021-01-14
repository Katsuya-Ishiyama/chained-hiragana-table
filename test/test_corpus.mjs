import { readFileSync, writeFileSync } from 'fs';
import { Corpus } from '../lib/corpus.mjs';
import { fileSync } from 'tmp';
import chai from 'chai';

describe('Corpus', function() {
  let testCorpus = {
    data: [
      {"kanji":"ユーザー", "yomi":"ゆーざー", "category":"名詞", "subcategory":"普通名詞"},
      {"kanji":"関心", "yomi":"かんしん", "category":"名詞", "subcategory":"普通名詞"},
      {"kanji":"病気", "yomi":"びょうき", "category":"名詞", "subcategory":"普通名詞"},
      {"kanji":"ドクター", "yomi":"どくたー", "category":"名詞", "subcategory":"普通名詞"},
      {"kanji":"全国", "yomi":"ぜんこく", "category":"名詞", "subcategory":"普通名詞"}
    ],
    fileObj: null,
    filePath: null
  };

  before(function() {
    let tmpobj = fileSync({mode: 0o644, postfix: '.jsonl'});
    let jsonlStr = testCorpus.data.map(JSON.stringify).join("\n");
    writeFileSync(tmpobj.fd, jsonlStr);
    testCorpus.fileObj = tmpobj;
    testCorpus.filePath = tmpobj.name;
  });

  after(function() {
    testCorpus.fileObj.removeCallback();
  });

  describe('#load()', function() {

    it('should success to load with expected contents.', function() {
      let corpus = new Corpus(testCorpus.filePath);
      corpus.load();
      let actual = corpus.corpus;
      let expected = testCorpus.data;

      chai.expect(actual).to.deep.equal(expected);
    });

    it('should raise an Error if passed an incorrect path.', function() {
      let corpus = new Corpus('incorrect/path/to/corpus.jsonl');
      chai.expect(corpus.load).to.throw(Error);
    });
  });

  describe('#queryWordWith()', function() {

    it('should success queryWordWith', function() {
      let corpus = new Corpus(testCorpus.filePath);
      corpus.load();
      let actual = corpus.queryWordWith('か');

      let expected = new Map([
        ['か', ['かんしん']]
      ]);

      chai.expect(actual).to.deep.equal(expected);
    });

    it('should return empty map', function() {
      let corpus = new Corpus(testCorpus.filePath);
      corpus.load();
      let actual = corpus.queryWordWith('あ');

      let expected = new Map([
        ['あ', []]
      ]);

      chai.expect(actual).to.deep.equal(expected);
    });

    it('should raise an Error if passed a character except for Hiragana.', function() {
      let corpus = new Corpus(testCorpus.filePath);
      corpus.load();
      chai.expect(() => corpus.queryWordWith('a')).to.throw(Error);
    });
  });
});