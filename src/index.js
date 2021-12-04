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
 * @return {Object} 処理結果
 */
function getAllProjects() { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectを取得する
 * @param {String} projectCode 【必須】Projectを識別するCode
 * @return {Object} 処理結果
 */
function getSpecificProject(projectCode) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
