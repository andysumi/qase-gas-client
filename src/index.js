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
 * @param {Number} [limit=10]
 * @param {Number} [offset=0]
 * @return {Object} 処理結果
 */
function getAllProjects(limit, offset) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したProjectを取得する
 * https://developers.qase.io/reference/get-project
 * @param {String} code 【必須】Projectを識別するCode
 * @return {Object} 処理結果
 */
function getSpecificProject(code) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectを作成する
 * https://developers.qase.io/reference/create-project
 * @param {String} title 【必須】Projectの名称
 * @param {String} code 【必須】Projectを識別するCode
 * @param {Object} options APIドキュメント参照
 * @return {Object} 処理結果
 */
function createProject(title, code, options) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * Projectを削除する
 * https://developers.qase.io/reference/delete-project
 * @param {String} code 【必須】Projectを識別するCode
 * @return {Object} 処理結果
 */
function deleteProject(code) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 全てのTestCaseを取得する
 * https://developers.qase.io/reference/get-cases
 * @param {String} code 【必須】Projectを識別するCode
 * @param {Object} filters 検索条件
 *  @param {String} filters.search
 *  @param {Number} filters.milestone_id
 *  @param {Number} filters.suite_id
 *  @param {String} filters.severity 使用可能な値: undefined, blocker, critical, major, normal, minor, trivial
 *  @param {String} filters.priority 使用可能な値: undefined, high, medium, low
 *  @param {String} filters.type 使用可能な値: other, functional smoke, regression, security, usability, performance, acceptance
 *  @param {String} filters.behavior 使用可能な値: undefined, positive negative, destructive
 *  @param {String} filters.automation 使用可能な値: is-not-automated, automated to-be-automated
 *  @param {String} filters.status 使用可能な値: actual, draft deprecated
 * @param {Number} [limit=10]
 * @param {Number} [offset=0]
 * @return {Object} 処理結果
 */
function getAllCases(code, filters, limit, offset) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
   * TestCaseを作成する
   * https://developers.qase.io/reference/create-case
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} title 【必須】TestCase名
   * @param {Object} options APIドキュメント参照
   * @return {Object} 処理結果
   */
function createCase(code, title, options) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 全てのTestRunを取得する
 * https://developers.qase.io/reference/get-runs
 * @param {String} code 【必須】Projectを識別するCode
 * @param {Object} filters 検索条件
 *  @param {String} filters.search
 *  @param {String} filters.status
 *  @param {Number} filters.milestone
 *  @param {Number} filters.environment
 *  @param {Date} filters.from_start_time
 *  @param {Date} filters.to_start_time
 * @param {Number} [limit=10]
 * @param {Number} [offset=0]
 * @param {Boolean} isIncluded
 * @return {Object} 処理結果
 */
function getAllRuns(code, filters, limit, offset, isIncluded) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * 指定したTestRunを取得する
 * https://developers.qase.io/reference/get-run
 * @param {String} code 【必須】Projectを識別するCode
 * @param {Number} id 【必須】TestRunを識別するID
 * @return {Object} 処理結果
 */
function getSpecificRun(code, id) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
   * TestRunを作成する
   * https://developers.qase.io/reference/create-run
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} title 【必須】TestRun名
   * @param {Object} options APIドキュメント参照
   * @return {Object} 処理結果
   */
function createRun(code, title, options) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
   * TestRunを削除する
   * https://developers.qase.io/reference/delete-run
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} id 【必須】TestRunを識別するID
   * @return {Object} 処理結果
   */
function deleteRun(code, id) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
   * TestRunを公開/非公開にする
   * https://developers.qase.io/reference/update-run-publicity
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} id 【必須】TestRunを識別するID
   * @param {Boolean} status 【必須】true: 公開、false: 非公開
   * @return {Object} 処理結果
   */
function updateRunPublication(code, id, status) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
   * TestRunを完了にする
   * https://developers.qase.io/reference/complete-run
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} id 【必須】TestRunを識別するID
   * @return {Object} 処理結果
   */
function completeRun(code, id) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
