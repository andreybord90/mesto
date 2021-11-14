export default class UserInfo {
  constructor() {
    this._name = "";
    this._job = "";
  }

  setUserInfo(data) {
    this._name = data.popup__name;
    this._job = data.popup__job;
  }

  getUserInfo() {
    return {
      name: this._name,

      job: this._job,
    };
  }
}
