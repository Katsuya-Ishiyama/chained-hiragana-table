const NO_ANSWER = '';

export class Answer {
    constructor(answer) {
        if (answer === undefined) {
            answer = NO_ANSWER;
        }
        this.answer = answer;
    }

    isEmpty() {
        return this.answer === NO_ANSWER
    }

    getFirstCharacter() {
        return this.answer.charAt(0);
    }

    getLastCharacter() {
        let lastCharIndex = this.answer.length - 1;
        return this.answer.charAt(lastCharIndex);
    }
}
