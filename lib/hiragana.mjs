import { Answer } from './answer.mjs'
import { HIRAGANA_LIST } from './consts.mjs'


export class HiraganaTable {
    constructor() {
        let hiraganaTableList = HIRAGANA_LIST.map((x) => [x, new Answer()]);

        this.hiraganaTable = new Map(hiraganaTableList);
    }

    extractAvailableHiragana() {
        let availableHiragana = new Set();

        for (let [hiragana, answer] of this.hiraganaTable) {
            if (answer.isEmpty()) {
                availableHiragana.add(hiragana);
            }
        }

        return availableHiragana;
    }

    setAnswer(target, answer) {
        // TODO: 「を」と「ん」の場合のバリデーションを追加する
        if (!answer.startsWith(target)) {
            throw Error('target was different to the 1st character of the answer.');
        }
        this.hiraganaTable.get(target).answer = answer;
    }
}