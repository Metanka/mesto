export default class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  fetchAuthorization() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .catch((err) => {
        console.log(`Аттеншн! ${err}`);
      });
  }

  editProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .catch(res => console.log(`АШИПКА! ${res}`));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        link: data.link,
        name: data.name
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .catch(res => console.log(`АШИПКА! Карточек ${res}`));
  }

  getCardsInfo() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(`Аттеншн! ${err}`);
      });
  }


  getUserInfoServ() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .catch((err) => {
        console.log(`Аттеншн! ${err}`);
      });
  }

  deleteCardServ(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  addLikeServ(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .catch(res => console.log(`АШИБЛИСЬ ЛАЙКОМ ${res}`));
  }

  deleteLikeServ(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => res.json())
      .then(res => res)
      .catch(res => console.log(`АШИБЛИСЬ ЛАЙКОМ ${res}`));
  }

  changeAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
      .catch(res => console.log(`АШИБЛИСЬ АВАТАРКОЙ ${res}`));
  }
}
