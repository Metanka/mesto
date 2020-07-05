import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFunc) {
    super(popupSelector);
    this._callbackFunc = callbackFunc;
    this._form = document.querySelector(`.${this._popupSelector}`).querySelector('.popup__container');
    this._arrayInputs = Array.from(document.querySelector(`.${this._popupSelector}`).querySelectorAll('input'));
    this._submitClose = this._submitClose.bind(this);
  }

  open(data) {
    super.open();
    if (data) {
      this._arrayInputs.forEach(input => {
        input.setValue(data[input.id]);
      });
    }
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', (evt) => {
      this._renderLoading(true);
      this._submitClose(evt);
    });
    this._form.reset();
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._form.querySelector('button').textContent = 'Сохранение...';
    } else {
      this._form.querySelector('button').textContent = 'Сохранить';
    }
  }

  //1. найти массив из инпутов
  //2. reduce все инпуты в объект, где ключ - id, а значение - value
  //3. return объект
  _getInputValues() {
    const inputsValue = this._arrayInputs.reduce((memo, {name, value}) => {
      return {
        ...memo,
        [name]: value
      };
    }, {});
    return inputsValue;
  }

  _submitClose(evt) {
    evt.preventDefault();
    this._callbackFunc(this._getInputValues());
    this.close();
    this._renderLoading(false);
  }
  //1. навешивает сабмит на баттон, который вызывает callback  и туда передает return is value
  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitClose);
  }
}
