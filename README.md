# localgovjp 日本の地方自治体一覧オープンデータ

list of local government in Japan

## format

- pid,pref,cid,city,citykana,lat,lng,url,phrase
    - （都道府県コード, 都道府県名, 市区町村コード, 市区町村名, 市区町村名よみ, 緯度, 経度, 自治体ホームページURL, キャッチフレーズ）

## for web app

- CSV
   - https://code4fukui.github.io/localgovjp/localgovjp-utf8.csv  
   - https://code4fukui.github.io/localgovjp/prefjp-utf8.csv  
- JSON  
   - https://code4fukui.github.io/localgovjp/localgovjp.json  
   - https://code4fukui.github.io/localgovjp/prefjp.json  

## how to update

1. edit [deon/c-localgovjp-utf8.csv](deno/c-localgovjp-utf8.csv)
2. run make.js with [Deno](https://deno.land/)

```bash
cd deno
deno run -A make.js
```

## sample app

- https://code4fukui.github.io/localgovjp/  

## data

- [国土地理院](https://github.com/gsi-cyberjapan/gsimaps)
- [地方公共団体情報システム機構 全国自治体マップ検索](https://www.j-lis.go.jp/spd/map-search/cms_1069.html)

## update

- 2016.11.29 全Webサイトチェックし更新
- 2017.2.18 泊村の重複を削除
- 2019.1.1 更新
- 2020.1.4 更新
- 2020.4.17 更新
- 2021.1.20 更新
- 2021.6.2 福岡県那珂川町→福岡県那珂川市
- 2021.6.30 三重県北牟婁郡紀北町役場の位置情報誤り修正

## license

- [CC0](https://creativecommons.org/publicdomain/zero/1.0/)
