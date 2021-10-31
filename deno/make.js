//import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { LGCode } from "https://code4fukui.github.io/LGCode/LGCode.js";
import { fix0 } from "https://js.sabae.cc/fix0.js";

const make = async (fn, name, constname) => {
    const srcfn = fn;
    // const srcfn = "../" + fn;
    const data = CSV.toJSON(CSV.decode(await Deno.readTextFile(srcfn)));
    console.log(data);
    for (const d of data) {
        delete d.flg;
        delete d.status;
        delete d.modified;
        delete d.err;
        d.lgcode = LGCode.encode(d.pref);
        d["ISO3155-2"] = "JP-" + fix0(d.pid, 2);
    }
    await Deno.writeTextFile("../" + name + "-utf8.csv", CSV.stringify(data));
    //
    const json = JSON.stringify(data, null, 2);
    await Deno.writeTextFile("../" + name + ".json", json);
    await Deno.writeTextFile("../" + name + ".js", "const " + constname + " = " + json);
};

//chk("prefjp-utf8.csv");
//chkHeader("https://fukuno.jig.jp/");
//make("c-localgovjp-utf8.csv", "localgovjp", "LOCALGOV_JP");
make("c-prefjp-utf8.csv", "prefjp", "PREF_JP");

/*
const res = await fetchWithTimeout("http://www.town.okushiri.lg.jp/");
console.log(res.headers.get("location"));
console.log(res.headers.location);
*/