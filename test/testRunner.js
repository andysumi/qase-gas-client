function testRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  const test = new GasTap();
  const common = new TestCommon();

  /***** Test cases ******************************/
  testProjectMethods_(test, common);
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

function testRunMethods_(test, common) {
  test('getAllTestRuns()', function (t) {
    (() => {
      const res = common.qase.getAllTestRuns(common.projectCode);
      t.ok(res.status, '検索条件を指定していない時、TestRunが取得されること');
      t.ok(res.result.entities.length > 0, '検索条件を指定していない時、1件以上のTestRunが取得されること');
    })();

    (() => {
      const res = common.qase.getAllTestRuns(common.projectCode, { search: 'Test', to_start_time: new Date() }, 1, 1, true);
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
