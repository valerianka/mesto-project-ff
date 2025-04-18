import '../pages/index.css';
import {initialCards} from './cards.js';
import * as card from './card.js';
import * as modal from './modal.js';

const content = document.querySelector('.page__content');
const editModal = content.querySelector('.popup_type_edit');
editModal.classList.add('popup_is-animated');
const editForm = editModal.querySelector('.popup__form');
const editFormNameField = editForm.querySelector('.popup__input_type_name');
const editFormDescriptionField = editForm.querySelector('.popup__input_type_description');
const profileTitleField = content.querySelector('.profile__title');
const profileDescriptionField = content.querySelector('.profile__description');
const addCardModal = content.querySelector('.popup_type_new-card');
addCardModal.classList.add('popup_is-animated');
const addCardForm = addCardModal.querySelector('.popup__form');
const viewCard = content.querySelector('.popup_type_image');
viewCard.classList.add('popup_is-animated');
const viewCardTitle = viewCard.querySelector('.popup__caption');
const viewCardImage = viewCard.querySelector('.popup__image');
const addCardFormNameField = addCardForm.querySelector('.popup__input_type_card-name');
const addCardFormUrlField = addCardForm.querySelector('.popup__input_type_url');
const cardsList = content.querySelector('.places__list');
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", (evt) => {
  editFormNameField.value = profileTitleField.textContent;
  editFormDescriptionField.value = profileDescriptionField.textContent;
  modal.openModal(editModal)});
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", (evt) => {modal.openModal(addCardModal);});

const addPopupEventListeners = (popup) => {
  const closeBtn = popup.querySelector(".popup__close");
  closeBtn.addEventListener('click', (evt) => {modal.closeModal(popup);});
  popup.addEventListener('click', (evt) => {modal.handleOverlayClickEvent(evt, popup);});
};

const handleEditProfileSubmitEvent = (evt) => {
  evt.preventDefault();
  if ((editFormNameField.value.length > 0) && (editFormDescriptionField.value.length > 0)) {
    profileTitleField.textContent = editFormNameField.value;
    profileDescriptionField.textContent = editFormDescriptionField.value;
    evt.target.reset();
  }
  modal.closeModal(editModal);
};

const handleAddCardSubmitEvent = (evt) => {
  evt.preventDefault();
  const newCardElem = card.createCard({name: addCardFormNameField.value, link: addCardFormUrlField.value}, card.removeCard, card.likeCard, openCard);
  cardsList.prepend(newCardElem);
  evt.target.reset();
  modal.closeModal(addCardModal);
};

const openCard = function(cardElement) {
  viewCardTitle.textContent = cardElement.querySelector('.card__title').textContent;
  viewCardImage.src = cardElement.querySelector('.card__image').src;
  viewCard.alt = cardElement.alt;
  modal.openModal(viewCard);
};

addPopupEventListeners(editModal);
addPopupEventListeners(addCardModal);
addPopupEventListeners(viewCard);
editForm.addEventListener('submit', handleEditProfileSubmitEvent);
addCardForm.addEventListener('submit', handleAddCardSubmitEvent);

// @todo: Вывести карточки на страницу
const showCards = function(cards) {
  cards.forEach((cardElem) =>
    cardsList.appendChild(card.createCard(cardElem, card.removeCard, card.likeCard, openCard))
  );
};

showCards(initialCards);
