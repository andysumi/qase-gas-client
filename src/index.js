/**
 * Qaseのインスタンスを作成する
 * @param {String} apiKey 【必須】APIキー
 * @return {Qase} Qaseのインスタンス
 */
function create(apiKey) { // eslint-disable-line no-unused-vars
  return new Qase(apiKey);
}

/**
 * 全てのProjectを取得する
 * https://developers.qase.io/reference/get-projects
 * @return {Object} 処理結果
 */
function getAllProjects() { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectを取得する
 * https://developers.qase.io/reference/get-project
 * @param {String} projectCode 【必須】Projectを識別するCode
 * @return {Object} 処理結果
 */
function getSpecificProject(projectCode) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectを作成する
 * https://developers.qase.io/reference/create-project
 * @param {String} title 【必須】プロジェクト名
 * @param {String} code 【必須】プロジェクトコード
 * @param {Object} options APIドキュメント参照
 * @return {Object} 処理結果
 */
function createProject(title, code, options) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
