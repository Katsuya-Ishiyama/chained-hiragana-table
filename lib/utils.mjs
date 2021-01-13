import { readdirSync } from "fs";
import { HIRAGANA_LIST } from '../lib/consts.mjs';

export let listFiles = (path) =>
  readdirSync(path, {withFileTypes: true}).flatMap((item) => {
    let itemPath = `${path}/${item.name}`;
    return item.isFile() ? itemPath : listFiles(itemPath);
  });

export let checkCharIsHiragana = (char) => HIRAGANA_LIST.includes(char);