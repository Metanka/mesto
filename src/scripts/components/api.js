export default class Api {
  constructor(cohordID, token) {
    this._cohordID = cohordID;
    this._token = token;
  }

  fetchAuthorization() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohordID}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.json())
      .then((result) => result)
      .catch((err) => {
        console.log(`Аттеншн! ${err}`);
      });
  }

  editProfileInfo(name, about) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohordID}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => res.json)
      .then(res => res)
      .catch(res => console.log(`АШИПКА! ${res}`));
  }

  addNewCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohordID}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: data.link,
        name: data.name
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log({data});
        return data;
      })
      .catch(res => console.log(`АШИПКА! Карточек ${res}`));
  }

  getCardsInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohordID}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(`Аттеншн! ${err}`);
      });
  }


  getUserInfoServ() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohordID}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.json())
      .then((res) => {
        console.log({res});
        return res;
      })
      .catch((err) => {
        console.log(`Аттеншн! ${err}`);
      });
  }

  deleteCardServ(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohordID}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then((res) => console.log(res));
}

  addLikeServ(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohordID}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
    .then((res) => res.json())
    .then(res => res)
    .catch(res => console.log(`АШИБЛИСЬ ЛАЙКОМ ${res}`));
  }
}