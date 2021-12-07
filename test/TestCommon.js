class TestCommon { // eslint-disable-line
  constructor() {
    const properties = PropertiesService.getScriptProperties();
    this.apiKey_ = properties.getProperty('API_KEY');
    this.qase_ = new Qase(this.apiKey_);
    this.projectCode_ = properties.getProperty('PROJECT_CODE');
  }

  get qase() {
    return this.qase_;
  }

  get projectCode() {
    return this.projectCode_;
  }
}
