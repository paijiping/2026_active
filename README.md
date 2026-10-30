# 2026_員工旅遊

數位科技公司員工旅遊活動報名網站。

## GitHub Pages

網站網址：部署 GitHub Pages 後補上。

## 報名資料試算表

試算表：[2026_員工旅遊](https://docs.google.com/spreadsheets/d/1Foa76KjWNUMSXWW-5lx9h7MD-wklFCahu-v-2NAFP88/edit)
Apps Script 網頁應用程式已部署，報名表單已連接至該端點。

1. 在 [Google Apps Script](https://script.google.com/) 建立新專案，將 `apps-script/Code.gs` 貼入編輯器。
2. 選擇並執行 `setup`，依 Google 畫面完成授權。這會建立 `2026_員工旅遊` 試算表、標題列，並將「電話」整欄設定為純文字。
3. 部署為網頁應用程式：執行身分選「我」，存取權選「所有人」，完成部署授權並複製網頁應用程式網址。
4. 若重新部署，將新的網址填入 `script.js` 的 `APPS_SCRIPT_URL`，再推送變更到 GitHub。
5. 以網站表單送出測試資料，並在試算表確認新增資料及電話前導零仍保留。

## 本機預覽

在專案根目錄執行 `python3 -m http.server 8000`，再瀏覽 `http://localhost:8000`。