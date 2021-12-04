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
}
