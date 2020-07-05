export default class UserInfo {
  constructor({name, info}, avatar) {
    this._name = document.querySelector(`.${name}`);
    this._info = document.querySelector(`.${info}`);
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }

  setUserAvatar(data) {
    this._avatar.src = (data.avatar || data.link);
  }
}