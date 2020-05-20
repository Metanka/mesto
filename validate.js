const formObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_text_error'
};

//добавляет класс инпуту и показывает ошибку
const behaviorInputError = (formElement, inputElement, formObject, errorMessage = '') => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (errorMessage) {
    inputElement.classList.add(formObject.inputErrorClass);
  } else {
    inputElement.classList.remove(formObject.inputErrorClass);
  }
  errorElement.textContent = errorMessage;
};
//переключает стили в зависимости от валидности
const checkInputValidity = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    behaviorInputError(formElement, inputElement, formObject, inputElement.validationMessage);
  } else {
    behaviorInputError(formElement, inputElement, formObject);
  }
};
//возвращает если хотябы один не валиден
const hasInvalidInput = inputList => {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};
//переключает кнопку в зависимости от валидности
const toggleButtonState = (inputList, buttonElement, formObject) => {
  const hasInvalid = hasInvalidInput(inputList);
  buttonElement.classList.toggle(formObject.inactiveButtonClass, hasInvalid);
  buttonElement.disabled = hasInvalid;
};
//ко всем инпутам/кнопкам добавляет слушателей на валидность
const setEventListeners = (formElement, formObject) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObject);
  inputList.forEach((inputElement) => {
    inputElement.setValue = function (value) {
      inputElement.value = value;
      toggleButtonState(inputList, buttonElement, formObject);
      checkInputValidity(formElement, inputElement, formObject);
    };

    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formObject);
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

const clearForm = (formElement, formObject) => {
  const inputsList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  inputsList.forEach(input => {
    input.setValue('');
  });
};
//валидация на все формы, инпуты и кнопки
const enableValidation = (formObject) => {
  const formsList = Array.from(document.querySelectorAll(formObject.formSelector));
  formsList.forEach((formElement) => {
    setEventListeners(formElement, formObject);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      clearForm(formElement, formObject);
    });
  });
};

enableValidation(formObject);