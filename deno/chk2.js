//import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { CSV } from "./CSV.js";

const fetchWithTimeout = async (url, timeoutmsec) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort() }, timeoutmsec || 5 * 1000);
    try {
        const res = await fetch(url, { signal: controller.signal, redirect: "manual" });
        console.log(res.headers);
        return res;
    } finally {
        clearTimeout(timeout);
    }
};
const fetchLocation = async (url, timeoutmsec) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort() }, timeoutmsec || 5 * 1000);
    try {
        const res = await fetch(url, { signal: controller.signal, redirect: "manual" });
        console.log(res.headers);
        return res.location;
    } finally {
        clearTimeout(timeout);
    }
};

const chkHeader = async (url) => {
    const res = await fetchWithTimeout(url, 5000);
    //console.log(res.headers);
    const status = res.status;
    return status;
};

const chk = async (fn) => {
    const srcfn = fn;
    let cnt = 0;
    // const srcfn = "../" + fn;
    const data = CSV.toJSON(CSV.decode(await Deno.readTextFile(fn)));
    // console.log(data);
    for (const d of data) {
        /*
        if (d.status != 200 && !d.err) { // 移動サイト
            console.log(d.status, d.url);
            //const url = await fetchLocation(d.url);
            cnt++;
            // http://www2.city.mine.lg.jp/www/toppage/0000000000000/APM03000.html
            // https://www2.city.mine.lg.jp/index.html
        }
        */
        if (d.url.startsWith("http://") && d.err) {
            console.log(d.url, d.err);
            //const url = await fetchLocation(d.url);
            cnt++;
        }
        //await Deno.writeTextFile(fn, CSV.encode(CSV.fromJSON(data)));
    }
    console.log(cnt); // 94件
};

//chk("prefjp-utf8.csv");
//chkHeader("https://fukuno.jig.jp/");
chk("c-localgovjp-utf8.csv");

