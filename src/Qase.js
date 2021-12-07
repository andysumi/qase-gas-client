class Qase { // eslint-disable-line
  constructor(apiKey) {
    this.client_ = new Client(apiKey);
  }

  /**
   * 全てのProjectを取得する
   * @param {Number} [limit=10]
   * @param {Number} [offset=1]
   * @return {Object} 処理結果
   */
  getAllProjects(limit, offset) {
    let params = {};
    if (limit) params['limit'] = limit;
    if (offset) params['offset'] = offset;
    return this.client_.fetchGet('/project', params);
  }

  /**
   * 指定したProjectを取得する
   * @param {String} projectCode 【必須】Projectを識別するCode
   * @return {Object} 処理結果
   */
  getSpecificProject(projectCode) {
    return this.client_.fetchGet(`/project/${projectCode}`);
  }

  /**
   * Projectを作成する
   * @param {String} title 【必須】プロジェクト名
   * @param {String} code 【必須】プロジェクトコード
   * @param {Object} options APIドキュメント参照
   * @return {Object} 処理結果
   */
  createProject(title, code, options) {
    if (!title) throw new Error('"title" must be specified');
    if (!code) throw new Error('"code" must be specified');

    let payload = { title: title, code: code, };
    if (options) payload = Object.assign(payload, options);

    return this.client_.fetchPost('/project', payload);
  }

  /**
   * Projectを削除する
   * @param {String} code 【必須】Projectを識別するCode
   * @return {Object} 処理結果
   */
  deleteProject(code) {
    if (!code) throw new Error('"code" must be specified');

    return this.client_.fetchDelete(`/project/${code}`);
  }
}
