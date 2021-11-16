export default class UserInfo {
  constructor(nameElem, jobElem) {
    this._name = nameElem;
    this._job = jobElem;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,

      job: this._job.textContent,
    };
  }
}
