function testRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  const test = new GasTap();
  const common = new TestCommon();

  /***** Test cases ******************************/
  testProjectMethods_(test, common);
  testSuiteMethods_(test, common);
  testCaseMethods_(test, common);
  testRunMethods_(test, common);
  /***********************************************/

  test.finish();
}

function testProjectMethods_(test, common) {
  test('getAllProjects()', function(t) {
    const res = common.qase.getAllProjects();
    t.ok(res instanceof Object, 'Objectで取得できること');
    t.ok(res.status, '処理が正常に完了すること');
    t.ok(res.result.entities.length > 0, '1件以上のProjectが取得できること');
  });

  test('getSpecificProject()', function (t) {
    const res = common.qase.getSpecificProject(common.projectCode);
    t.ok(res instanceof Object, 'Objectで取得できること');
    t.ok(res.status, '処理が正常に完了すること');
    t.equal(res.result.code, common.projectCode, '指定したプロジェクトが取得できること');
  });

  test('createProject()', function (t) {
    const res = common.qase.createProject('Test Project', 'TEST');
    t.ok(res instanceof Object, 'Objectで取得できること');
    t.ok(res.status, '処理が正常に完了すること');
    t.equal(res.result.code, 'TEST', '指定したプロジェクトが作成されること');
  });

  test('deleteProject()', function (t) {
    const res = common.qase.deleteProject('TEST');
    t.ok(res instanceof Object, 'Objectで取得できること');
    t.ok(res.status, '処理が正常に完了すること');
  });
}

function testSuiteMethods_(test, common) {
  test('getAllSuites()', function (t) {
    (() => {
      const res = common.qase.getAllSuites(common.projectCode);
      t.ok(res.status, '検索条件を指定していない時、TestCaseが取得されること');
      t.ok(res.result.entities.length > 0, '検索条件を指定していない時、1件以上のTestCaseが取得されること');
    })();

    (() => {
      const res = common.qase.getAllSuites(common.projectCode, { search: 'Test' }, 1, 0);
      t.ok(res.status, '検索条件を指定した時、TestCaseが取得できること');
      t.ok(res.result.entities.length > 0, '検索条件を指定した時、1件以上のTestCaseが取得できること');
    })();
  });

  test('TestSuite CRUD', function (t) {
    // create
    const id = (() => {
      const res = common.qase.createSuite(common.projectCode, 'テスト', {
        description: 'テストです',
        preconditions: '前提条件'
      });
      t.ok(res.status, 'createSuite: TestSuiteが作成されること');
      t.equal(typeof res.result.id, 'number', 'createSuite: "id"が整数であること');

      return res.result.id;
    })();

    // get
    ((id) => {
      const res = common.qase.getSpecificSuite(common.projectCode, id);
      t.ok(res.status, 'getSpecificSuite: TestSuiteが取得されること');
      t.equal(res.result.id, id, 'getSpecificSuite: "id"が作成したTestSuiteと同じidであること');
    })(id);
  });
}

function testCaseMethods_(test, common) {
  test('getAllCases()', function (t) {
    (() => {
      const res = common.qase.getAllCases(common.projectCode);
      t.ok(res.status, '検索条件を指定していない時、TestCaseが取得されること');
      t.ok(res.result.entities.length > 0, '検索条件を指定していない時、1件以上のTestCaseが取得されること');
    })();

    (() => {
      const res = common.qase.getAllCases(common.projectCode, { search: 'Test', suite_id: 1, status: 'actual' }, 1, 0);
      t.ok(res.status, '検索条件を指定した時、TestCaseが取得できること');
      t.ok(res.result.entities.length > 0, '検索条件を指定した時、1件以上のTestCaseが取得できること');
    })();
  });

  test('TestCase CRUD', function (t) {
    // create
    const id = (() => {
      const res = common.qase.createCase(common.projectCode, 'テスト', {
        description: 'テストです',
        preconditions: '前提条件',
        postconditions: '事後条件',
        severity: 1,
        priority: 1,
        behavior: 1,
        type: 1,
        layer: 1,
        is_flaky: 1,
        suite_id: 1,
        milestone_id: 1,
        automation: 1,
        status: 1,
        steps: [{ position: 1, action: '手順', data: 'データ', expected_result: '期待結果' }],
        tags: ['test', 'api']
      });
      t.ok(res.status, 'createCase: TestCaseが作成されること');
      t.equal(typeof res.result.id, 'number', 'createCase: "id"が整数であること');

      return res.result.id;
    })();

    // get
    ((id) => {
      const res = common.qase.getSpecificCase(common.projectCode, id);
      t.ok(res.status, 'getSpecificCase: TestCaseが取得されること');
      t.equal(res.result.id, id, 'getSpecificCase: "id"が作成したTestCaseと同じidであること');
    })(id);

    // update
    ((id) => {
      const res = common.qase.updateCase(common.projectCode, id, {
        title: 'テスト_更新',
        steps: [{ position: 1, action: '手順_更新', data: 'データ_更新', expected_result: '期待結果_更新' }],
      });
      t.ok(res.status, 'updateCase: TestCaseが更新されること');
      t.equal(res.result.id, id, 'updateCase: "id"が作成したTestCaseと同じidであること');
    })(id);

    // delete
    ((id) => {
      const res = common.qase.deleteCase(common.projectCode, id);
      t.ok(res.status, 'deleteCase: TestCaseが削除されること');
      t.equal(res.result.id, id, 'deleteCase: "id"が作成したTestCaseと同じidであること');
    })(id);
  });
}

function testRunMethods_(test, common) {
  test('getAllRuns()', function (t) {
    (() => {
      const res = common.qase.getAllRuns(common.projectCode);
      t.ok(res.status, '検索条件を指定していない時、TestRunが取得されること');
      t.ok(res.result.entities.length > 0, '検索条件を指定していない時、1件以上のTestRunが取得されること');
    })();

    (() => {
      const res = common.qase.getAllRuns(common.projectCode, { search: 'Test', to_start_time: new Date() }, 1, 1, true);
      t.ok(res.status, '検索条件を指定した時、TestRunが取得できること');
      t.ok(res.result.entities.length > 0, '検索条件を指定した時、1件以上のTestRunが取得できること');
    })();
  });

  test('TestRun CRUD', function (t) {
    // create
    const id = (() => {
      const res = common.qase.createRun(common.projectCode, 'テスト', { description: 'テストです', cases: [1, 2, 3], environment_id: 1, milestone_id: 1, plan_id: 1, tags: ['test', 'api'] });
      t.ok(res.status, 'createRun: TestRunが作成されること');
      t.equal(typeof res.result.id, 'number', 'createRun: "id"が整数であること');

      return res.result.id;
    })();

    // get
    ((id) => {
      const res = common.qase.getSpecificRun(common.projectCode, id);
      t.ok(res.status, 'getSpecificRun: TestRunが取得されること');
      t.equal(res.result.id, id, 'getSpecificRun: "id"が作成したTestRunと同じidであること');
    })(id);

    // publish
    ((id) => {
      const res = common.qase.updateRunPublication(common.projectCode, id, true);
      t.ok(res.status, 'updateRunPublication: TestRunが公開されること');
      t.equal(typeof res.result.url, 'string', 'updateRunPublication: "url"が文字列であること');
    })(id);

    // complete
    ((id) => {
      const res = common.qase.completeRun(common.projectCode, id);
      t.ok(res.status, 'completeRun: TestRunが完了になること');
    })(id);

    // delete
    ((id) => {
      const res = common.qase.deleteRun(common.projectCode, id);
      t.ok(res.status, 'deleteRun: TestRunが削除されること');
      t.equal(res.result.id, id, 'deleteRun: "id"が作成したTestRunと同じidであること');
    })(id);
  });
}
