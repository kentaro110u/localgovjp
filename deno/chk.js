//import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { CSV } from "./CSV.js";

const fetchWithTimeout = async (url, timeoutmsec) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort() }, timeoutmsec || 5 * 1000);
    try {
//        return await fetch(url, { signal: controller.signal });
        return await fetch(url, { signal: controller.signal, redirect: "manual" });
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
    // const srcfn = "../" + fn;
    const data = CSV.toJSON(CSV.decode(await Deno.readTextFile(fn)));
    console.log(data);
    for (const d of data) {
        /*
        if (d.url.startsWith("https:////")) {
            d.url = "https://" + d.url.substring(10);
        }
        */
        /*
        if (d.status || d.err) {
            continue; // skip
        }
        */
        console.log(d.url);
        if (d.url.startsWith("http://")) {
            
            //const url = "https:" + d.url.substring(5);
            const url = d.url;
            try {
                const res = await fetchWithTimeout(url);
                if (res.status.toString().startsWith("3")) {
                    console.log(res);
                    d.url = res.headers.get("location");
                    d.modified = true;
                }
                d.status = res.status;
            } catch (e) {
                console.log("err", e.name, e.message);
                d.err = e.message;
            }
        } else {
            /*
            try {
                const st = await chkHeader(d.url);
                d.status = st;
                //const text = await (await fetch(d.url)).text();
                //console.log(text.substring(0, 40));
            } catch (e) {
                console.log("err", e.name, e.message);
                d.err = e.message;
            }
            */
        }
        await Deno.writeTextFile("c-" + fn, CSV.encode(CSV.fromJSON(data)));
    }
};

//chk("prefjp-utf8.csv");
//chkHeader("https://fukuno.jig.jp/");
chk("localgovjp-utf8.csv");

/*
const res = await fetchWithTimeout("http://www.town.okushiri.lg.jp/");
console.log(res.headers.get("location"));
console.log(res.headers.location);


*/