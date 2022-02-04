class Qase { // eslint-disable-line
  constructor(apiKey) {
    this.client_ = new Client(apiKey);
  }

  /**
   * 全てのProjectを取得する
   * @param {Number} [limit=10]
   * @param {Number} [offset=0]
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
   * @param {String} code 【必須】Projectを識別するCode
   * @return {Object} 処理結果
   */
  getSpecificProject(code) {
    return this.client_.fetchGet(`/project/${code}`);
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

  /**
   * 全てのTestCaseを取得する
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
  getAllCases(code, filters, limit, offset) {
    if (!code) throw new Error('"code" must be specified');

    let param = {};
    if (filters) {
      for (const key in filters) {
        param[`filters[${key}]`] = filters[key];
      }
    }
    param['limit'] = limit ? limit : 10;
    param['offset'] = offset ? offset : 0;

    return this.client_.fetchGet(`/case/${code}`, param);
  }

  /**
   * 指定したTestCaseを取得する
   * @param {String} code 【必須】Projectを識別するCode
   * @param {Number} id 【必須】TestCaseを識別するID
   * @return {Object} 処理結果
   */
  getSpecificCase(code, id) {
    if (!code) throw new Error('"code" must be specified');
    if (!id) throw new Error('"id" must be specified');

    return this.client_.fetchGet(`/case/${code}/${id}`);
  }

  /**
   * TestCaseを作成する
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} title 【必須】TestCase名
   * @param {Object} options APIドキュメント参照
   * @return {Object} 処理結果
   */
  createCase(code, title, options) {
    if (!code) throw new Error('"code" must be specified');
    if (!title) throw new Error('"title" must be specified');

    let payload = { title: title };
    if (options) payload = Object.assign(payload, options);

    return this.client_.fetchPost(`/case/${code}`, payload);
  }

  /**
   * TestCaseを更新する
   * @param {String} code 【必須】Projectを識別するCode
   * @param {Number} id 【必須】TestCaseを識別するid
   * @param {Object} options APIドキュメント参照
   * @return {Object} 処理結果
   */
  updateCase(code, id, options) {
    if (!code) throw new Error('"code" must be specified');
    if (!id) throw new Error('"id" must be specified');

    const payload = options || {};

    return this.client_.fetchPatch(`/case/${code}/${id}`, payload);
  }

  /**
   * TestCaseを削除する
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} id 【必須】TestCaseを識別するID
   * @return {Object} 処理結果
   */
  deleteCase(code, id) {
    if (!code) throw new Error('"code" must be specified');
    if (!id) throw new Error('"id" must be specified');

    return this.client_.fetchDelete(`/case/${code}/${id}`);
  }

  /**
 * 全てのTestRunを取得する
 * @param {String} code 【必須】TestRunを識別するCode
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
  getAllRuns(code, filters, limit, offset, isIncluded) {
    if (!code) throw new Error('"code" must be specified');

    let param = {};
    if (filters) {
      for (const key in filters) {
        // 日付の項目はミリ秒数に変換
        if (key === 'from_start_time' || key === 'to_start_time') {
          filters[key] = filters[key].getTime();
        }
        param[`filters[${key}]`] = filters[key];
      }
    }
    param['limit'] = limit ? limit : 10;
    param['offset'] = offset ? offset : 0;
    if (isIncluded) param['include'] = 'cases';

    return this.client_.fetchGet(`/run/${code}`, param);
  }

  /**
   * 指定したTestRunを取得する
   * @param {String} code 【必須】Projectを識別するCode
   * @param {Number} id 【必須】TestRunを識別するID
   * @return {Object} 処理結果
   */
  getSpecificRun(code, id) {
    if (!code) throw new Error('"code" must be specified');
    if (!id) throw new Error('"id" must be specified');

    return this.client_.fetchGet(`/run/${code}/${id}`);
  }

  /**
   * TestRunを作成する
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} title 【必須】TestRun名
   * @param {Object} options APIドキュメント参照
   * @return {Object} 処理結果
   */
  createRun(code, title, options) {
    if (!code) throw new Error('"code" must be specified');
    if (!title) throw new Error('"title" must be specified');

    let payload = { title: title };
    if (options) payload = Object.assign(payload, options);

    return this.client_.fetchPost(`/run/${code}`, payload);
  }

  /**
   * TestRunを削除する
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} id 【必須】TestRunを識別するID
   * @return {Object} 処理結果
   */
  deleteRun(code, id) {
    if (!code) throw new Error('"code" must be specified');
    if (!id) throw new Error('"id" must be specified');

    return this.client_.fetchDelete(`/run/${code}/${id}`);
  }

  /**
   * TestRunを公開/非公開にする
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} id 【必須】TestRunを識別するID
   * @param {Boolean} status 【必須】true: 公開、false: 非公開
   * @return {Object} 処理結果
   */
  updateRunPublication(code, id, status) {
    if (!code) throw new Error('"code" must be specified');
    if (!id) throw new Error('"id" must be specified');
    if (typeof status !== 'boolean') throw new Error('"status" must be boolean value');

    return this.client_.fetchPatch(`/run/${code}/${id}/public`, { status: status });
  }

  /**
   * TestRunを完了にする
   * @param {String} code 【必須】Projectを識別するCode
   * @param {String} id 【必須】TestRunを識別するID
   * @return {Object} 処理結果
   */
  completeRun(code, id) {
    if (!code) throw new Error('"code" must be specified');
    if (!id) throw new Error('"id" must be specified');

    return this.client_.fetchPost(`/run/${code}/${id}/complete`);
  }
}
