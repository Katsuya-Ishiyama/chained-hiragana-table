import { readFileSync } from "fs";
import { checkCharIsHiragana } from "../lib/utils.mjs";

export class Corpus {

  constructor(path) {
    this.path = path;
    this.corpus = null;
  }

  load() {
    this.corpus = readFileSync(this.path).toString()
                                         .split('\n')
                                         .map(JSON.parse);
  }

  queryWordWith(char) {
    if (!checkCharIsHiragana(char)) {
      throw new Error('an unable character was passed.');
    }

    let extractedYomi = this.corpus
                            .filter((x) => { return x.yomi.startsWith(char); })
                            .map((x) => { return x.yomi; });
    return new Map([
      [char, extractedYomi]
    ]);
  }
}