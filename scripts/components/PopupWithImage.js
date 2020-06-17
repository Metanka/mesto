import Popup from './Popup.js';
import {
  viewImg,
  viewName
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    super.open();
    viewImg.src = link;
    viewName.textContent = name;
    viewImg.alt = name;
  }
}