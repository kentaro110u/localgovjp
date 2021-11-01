import * as Diff from "https://taisukef.github.io/jsdiff-es/src/index.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { JSONUtil } from "https://js.sabae.cc/JSONUtil.js";

/*
const data1 = (await CSV.fetch("../20200104/localgovjp-utf8.csv")).join("\n");
const data2 = CSV.fromJSON(CSV.toJSON(await CSV.fetch("../localgovjp-utf8.csv")).map(d => {
  delete d.lgcode;
  return d;
})).join("\n");
const diff = Diff.diffLines(data1, data2);
console.log(diff);
*/

const diffChars = async () => { // まぁまぁよい
  const data1 = await CSV.fetch("../20200104/localgovjp-utf8.csv");
  const data2 = CSV.fromJSON(CSV.toJSON(await CSV.fetch("../localgovjp-utf8.csv")).map(d => {
    delete d.lgcode;
    return d;
  }));
  let cnt = 0;
  for (let i = 0; i < data1.length; i++) {
    const d1 = data1[i].join(",");
    const d2 = data2[i].join(",");
    const diff = Diff.diffChars(d1, d2);
    if (diff.length > 1) {
      console.log(d1, d2, diff);
      cnt++;
    }
    //console.log(data1[i].join(","), data2[i].join(","))
  }
  console.log(cnt); // 411
};

const diffJson = async () => { // いまいち
  const data1 = CSV.toJSON(await CSV.fetch("../20200104/localgovjp-utf8.csv"));
  const data2 = CSV.toJSON(await CSV.fetch("../localgovjp-utf8.csv")).map(d => {
    delete d.lgcode;
    return d;
  });
  let cnt = 0;
  for (let i = 0; i < data1.length; i++) {
    const d1 = data1[i];
    const d2 = data2[i];
    //console.log(d1, d2);
    const diff = Diff.diffJson(d1, d2);
    if (diff.length > 1) {
      console.log(d1, d2, diff);
      cnt++;
    }
  }
  console.log(cnt); // 411
};

const diffJson2 = async () => { // 改善版
  const data1 = CSV.toJSON(await CSV.fetch("../20200104/localgovjp-utf8.csv"));
  const data2 = CSV.toJSON(await CSV.fetch("../localgovjp-utf8.csv")).map(d => {
    delete d.lgcode;
    return d;
  });
  let cnt = 0;
  for (let i = 0; i < data1.length; i++) {
    const d1 = data1[i];
    const d2 = data2[i];
    //console.log(d1, d2);
    const diff = JSONUtil.diff(d1, d2);
    if (diff) {
      //console.log(d1, d2, diff);

      // check other than url
      delete diff.url;
      if (Object.keys(diff).length > 0) {
        console.log(d2);
        console.log(diff);
      }
      cnt++;
    }
  }
  console.log(cnt); // 411
};

const diffAOSSL = async (oldfn) => { // 改善版
  const data1 = CSV.toJSON(await CSV.fetch(oldfn));
  const data2 = CSV.toJSON(await CSV.fetch("../localgovjp-utf8.csv")).map(d => {
    delete d.lgcode;
    return d;
  });
  const add = [];
  const remove = [];
  for (let i = 0; i < data1.length; i++) {
    const d1 = data1[i];
    const d2 = data2[i];
    const f1 = d1.url.startsWith("https://");
    const f2 = d2.url.startsWith("https://");
    if (!f1 && f2) {
      add.push(d2);
    } else if (f1 && !f2) {
      remove.push(d2);
    }
  }
  console.log(add, add.length);
  console.log(remove, remove.length);
  console.log(add.length, remove.length, add.length + remove.length); // 258, 81, 339

  console.log();
  const show = (d) => `<a href=${d.url}>${d.pref}${d.city.replace(" ", "")}</a>`;
  const list = (l) => l.map(show).join("、");
  console.log(`<p>AOSSL化した自治体リスト (${add.length}自治体)<br>`);
  console.log(list(add));
  console.log(`</p><p>非AOSSL化した自治体リスト (${remove.length}自治体)<br>`);
  console.log(list(remove));
  console.log("</p>");
};

//await diffJson2();
await diffAOSSL("../20210120/localgovjp-utf8.csv");

