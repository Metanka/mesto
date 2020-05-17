const formObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_text_error'
};

//добавляет класс инпуту и показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
};
//удаляет класс у инпута и скрывает ошибку
const hideInputError = (formElement, inputElement, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.textContent = '';
};
//переключает стили в зависимости от валидности
const checkInputValidity = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    hideInputError(formElement, inputElement, formObject);
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
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
//ко всем инпутам/кнопкам добавляет слушателей на валидность
const setEventListeners = (formElement, formObject) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);  
  toggleButtonState(inputList, buttonElement, formObject); 
  inputList.forEach((inputElement) => {
    inputElement.setValue = function(value) {
      inputElement.value = value;
      toggleButtonState(inputList, buttonElement, formObject);
    };

    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formObject);
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

const clearForm = (formElement, formObject) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  inputList.forEach(input => {
    input.setValue('');
  });
};
//валидация на все формы, инпуты и кнопки
const enableValidation = (formObject) => {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, formObject);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      clearForm(formElement, formObject);
    });
  });
};

enableValidation(formObject);