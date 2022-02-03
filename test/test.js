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
  test('getAllTestRuns() - 検索条件なし', function (t) {
    const res = common.qase.getAllTestRuns(common.projectCode);
    t.ok(res instanceof Object, 'Objectで取得できること');
    t.ok(res.status, '処理が正常に完了すること');
    t.ok(res.result.entities.length > 0, '1件以上のProjectが取得できること');
  })

  test('getAllTestRuns() - 検索条件あり', function (t) {
    const res = common.qase.getAllTestRuns(common.projectCode, { search: 'Test', to_start_time: new Date()}, 1, 1, true);
    t.ok(res instanceof Object, 'Objectで取得できること');
    t.ok(res.status, '処理が正常に完了すること');
    t.ok(res.result.entities.length > 0, '1件以上のProjectが取得できること');
  })
}
