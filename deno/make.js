import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const chk = async (fn) => {
    const srcfn = fn;
    // const srcfn = "../" + fn;
    const data = CSV.toJSON(CSV.decode(await Deno.readTextFile(fn)));
    console.log(data);
    for (const d of data) {
        delete d.flg;
        delete d.status;
        delete d.modified;
        delete d.err;
    }
    await Deno.writeTextFile("../localgovjp-utf8.csv", CSV.encode(CSV.fromJSON(data)));
    //
    const json = JSON.stringify(data, null, 2);
    await Deno.writeTextFile("../localgovjp.json", json);
    await Deno.writeTextFile("../localgovjp.js", "const LOCALGOV_JP = " + json);
};

//chk("prefjp-utf8.csv");
//chkHeader("https://fukuno.jig.jp/");
chk("c-localgovjp-utf8.csv");

/*
const res = await fetchWithTimeout("http://www.town.okushiri.lg.jp/");
console.log(res.headers.get("location"));
console.log(res.headers.location);


*/