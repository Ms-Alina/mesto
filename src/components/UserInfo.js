export default class UserInfo {
  constructor({userNameSelector, userCaptionSelector, userAvatarSelector}) {
    this._userNameProfile = document.querySelector(userNameSelector);
    this._userCaptionProfile = document.querySelector(userCaptionSelector);

    this._userAvatar = document.querySelector(userAvatarSelector); // добавили аватар
  }

  // Возвращаем объект с данными пользователя
  getUserInfo() {
    return this._profileData = {
      name: this._userNameProfile.textContent,
      about: this._userCaptionProfile.textContent
    };
  }

  // Принимаем новые данные пользователя
  setUserInfo({name, about, avatar}) {
    this._userNameProfile.textContent = name;
    this._userCaptionProfile.textContent = about;
    this._userAvatar.src = avatar;
  }
}