[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) [![Test and deploy to development](https://github.com/andysumi/qase-gas-client/actions/workflows/deploy_development.yml/badge.svg)](https://github.com/andysumi/qase-gas-client/actions/workflows/deploy_development.yml) [![Deploy to production](https://github.com/andysumi/qase-gas-client/actions/workflows/deploy_production.yml/badge.svg)](https://github.com/andysumi/qase-gas-client/actions/workflows/deploy_production.yml)

# qase-gas-client

Google Apps Script用のQase APIライブラリ

## スクリプトID

`1Mgsk7FBolG9X0A_sRg-CB3i6kbMcbz2844TNqt1dfM-wcHK3uDm8mWca`

## 使い方

### 事前準備

- [ライブラリをプロジェクトに追加する](https://developers.google.com/apps-script/guides/libraries)
- APIトークンを取得する

### コードサンプル

```js
function myFunction() {
  PropertiesService.getUserProperties().setProperty('TOKEN', '--- your-api-token ---');
  const client = QaseClient.create(PropertiesService.getUserProperties().getProperty('TOKEN'));

  const projects = client.getAllProjects();
  console.log(JSON.stringify(projects, null , '\t'));
}
```
