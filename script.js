const popup = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const popupForm = popup.querySelector('.popup__container');
const popupClose = popup.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
    changeClassPopupHidden();
}

function changeClassPopupHidden() {
  popup.classList.toggle('popup_hidden')
}

popupClose.addEventListener('click', changeClassPopupHidden);
popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', function () {
  changeClassPopupHidden();
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
});
