import { CSV } from "https://code4sabae.github.io/js/CSV.js";
//import { fetchCurl } from "https://code4sabae.github.io/js/fetchCurl.js";
import { fetchCurl } from "./fetchCurl.js";

const chk = async (fn) => {
    const srcfn = fn;
    // const srcfn = "../" + fn;
    const data = CSV.toJSON(CSV.decode(await Deno.readTextFile(fn)));
    console.log(data);
    for (const d of data) {
        if (d.flg == "ok") { // }== "ok") {
            continue;
        }
        console.log(d.city, d.cid, d.url);
        continue;
        try {
            const bin = await fetchCurl(d.url);
            if (bin && bin.length > 0) {
                d.flg = "ok";
                await Deno.writeFile("data/" + d.cid + ".html", bin);
                await Deno.writeTextFile("d-" + fn, CSV.encode(CSV.fromJSON(data)));
                continue;
            }
        } catch (e) {
            console.log(e);
        }
        d.flg = "err";
        await Deno.writeTextFile("d-" + fn, CSV.encode(CSV.fromJSON(data)));
    }
};

//chk("prefjp-utf8.csv");
//chkHeader("https://fukuno.jig.jp/");
chk("c-localgovjp-utf8.csv");

/*
const res = await fetchWithTimeout("http://www.town.okushiri.lg.jp/");
console.log(res.headers.get("location"));
console.log(res.headers.location);


*/