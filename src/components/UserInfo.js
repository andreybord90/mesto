export default class UserInfo {
  constructor(nameElem, jobElem, avatar) {
    this._name = nameElem;
    this._job = jobElem;
    this._avatar = avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
  }
  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,

      about: this._job.textContent,
    };
  }
}
