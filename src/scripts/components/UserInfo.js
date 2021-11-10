export default class UserInfo {
  constructor(nameElem, jobElem) {
    this._nameElem = nameElem;
    this._jobElem = jobElem;
    this._name = "";
    this._job = "";
  }
  updateUserInfo() {
    this._nameElem.textContent = this._name;
    this._jobElem.textContent = this._job;
  }
  setUserInfo(newName, newJob) {
    this._name = newName;
    this._job = newJob;
  }
  getUserInfo() {
    return {
      name: this._name,

      job: this._job,
    };
  }
}
