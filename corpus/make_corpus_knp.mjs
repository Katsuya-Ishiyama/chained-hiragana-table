import { readFileSync, readdirSync, writeFileSync } from "fs";

const DELIMITER = " ";
const CORPUS_PATH = '/home/katsuya/chained-hiragana-table/corpus.jsonl';
const SRC_DIR='/home/katsuya/KWDLC/knp';

let checkNoun = (line) => {
  let splited = line.split(DELIMITER);
  return splited[3] === "名詞";
};

let checkWordLine = (line) => {
  const WORD_LINE_COLUMN_NUM = 11;

  let splited = line.split(DELIMITER);
  return splited.length === WORD_LINE_COLUMN_NUM;
};

let checkNounLine = (line) => {
  return checkWordLine(line) && checkNoun(line);
};

let extractRequiredData = (line) => {
  let arr = line.split(DELIMITER);
  return {"kanji": arr[0], "yomi": arr[1], "category": arr[3], "subcategory": arr[5]}
};

let extractCorpus = (path) => {
  let text = readFileSync(path, "utf-8");
  let lines = text.toString().split("\n");

  return lines.filter(checkNounLine)
              .map(extractRequiredData);
};

let listFiles = (path) =>
  readdirSync(path, {withFileTypes: true}).flatMap((item) => {
    let itemPath = `${path}/${item.name}`;
    return item.isFile() ? itemPath : listFiles(itemPath);
  });

export let makeCorpus = (path) => {
  let corpus = listFiles(path).flatMap(extractCorpus);
  writeFileSync(CORPUS_PATH, corpus.map(JSON.stringify).join("\n"));
};

makeCorpus(SRC_DIR);