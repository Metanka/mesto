export class FormValidator {
  constructor(formElement, formObject) {
    this._formElement = formElement;
    this._formObject = formObject;
    this._inputElements = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    this._buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  }
  _behaviorInputError (inputElement, errorMessage = '') {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (errorMessage) {
      inputElement.classList.add(this._formObject.inputErrorClass);
    } else {
      inputElement.classList.remove(this._formObject.inputErrorClass);
    }
    errorElement.textContent = errorMessage;
  }
//переключает стили в зависимости от валидности
  _checkInputValidity (inputElement) {
    this._behaviorInputError(inputElement, inputElement.validationMessage);
  }
//возвращает если хотябы один не валиден
  _hasInvalidInput () {
    return this._inputElements.some((input) => {
      return !input.validity.valid;
    });
  }
//переключает кнопку в зависимости от валидности
  _toggleButtonState () {
    const hasInvalid = this._hasInvalidInput();
    this._buttonElement.classList.toggle(this._formObject.inactiveButtonClass, hasInvalid);
    this._buttonElement.disabled = hasInvalid;
  }
//ко всем инпутам/кнопкам добавляет слушателей на валидность
  _setEventListeners () {
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      inputElement.setValue = (value) => {
        inputElement.value = value;
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      };

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      this._formElement.addEventListener('submit', () => {
        this._toggleButtonState();
       });
    });
  }

  _clearForm () {
    this._inputElements.forEach((input) => {
      input.value = '';
    });
    this._toggleButtonState();
  }
//валидация на все формы, инпуты и кнопки
  enableValidation () {
    this._setEventListeners();
   // this._formElement.addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    //   th is._clearForm();
    // });
  }
}
