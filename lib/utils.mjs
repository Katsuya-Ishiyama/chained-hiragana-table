import { readdirSync } from "fs";

export let listFiles = (path) =>
  readdirSync(path, {withFileTypes: true}).flatMap((item) => {
    let itemPath = `${path}/${item.name}`;
    return item.isFile() ? itemPath : listFiles(itemPath);
  });