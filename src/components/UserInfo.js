export default class UserInfo {
  constructor({userNameSelector, userCaptionSelector}) {
    this._userNameProfile = document.querySelector(userNameSelector);
    this._userCaptionProfile = document.querySelector(userCaptionSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameProfile.textContent,
      calling: this._userCaptionProfile.textContent,
    };

    return userInfo
  }

  setUserInfo(userInfo) {
    this._userNameProfile.textContent = userInfo.name;
    this._userCaptionProfile.textContent = userInfo.calling;
  }
}