export default class UserInfo {
  constructor(userNameSelector, userCaptionSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userCaption = document.querySelector(userCaptionSelector);
    this._userNameProfile = document.querySelector('.profile__name');
    this._userCaptionProfile = document.querySelector('.profile__calling');
  }

  getUserInfo() {
    this._userName.value = this._userNameProfile.textContent;
    this._userCaption.value = this._userCaptionProfile.textContent;
  }

  setUserInfo() {
    this._userNameProfile.textContent = this._userName.value;
    this._userCaptionProfile.textContent = this._userCaption.value;
  }
}