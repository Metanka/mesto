import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFunc) {
    super(popupSelector);
    this._callbackFunc = callbackFunc;
    this._form = document.querySelector(`.${this._popupSelector}`);
    this._arrayInputs = Array.from(document.querySelector(`.${this._popupSelector}`).querySelectorAll('input'));
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
    this._arrayInputs.forEach(input => {
      input.value = '';
    });
  }
  //1. найти массив из инпутов
  //2. reduce все инпуты в объект, где ключ - id, а значение - value
  //3. return объект
  _getInputValues() {
    const inputsValue = this._arrayInputs.reduce((memo, {id, value}) => {
      return {
        ...memo,
        [id]: value
      };
    }, {});
    return inputsValue;
  }
  //1. навешивает сабмит на баттон, который вызывает callback  и туда передает return is value
  _setEventListeners() {
    super._setEventListeners();
    this._addListener(this._form, 'submit', (evt) => {
      evt.preventDefault();
      this._callbackFunc(this._getInputValues());
      this.close();
    });
  }
}
