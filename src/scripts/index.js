import '../pages/index.css';
import {initialCards, showCards} from './cards.js';
import * as modal from './modal.js';

const content = document.querySelector('.page__content');
const editModal = content.querySelector('.popup_type_edit');
editModal.classList.add('popup_is-animated');
const addCardModal = content.querySelector('.popup_type_new-card');
addCardModal.classList.add('popup_is-animated');
const viewCard = content.querySelector('.popup_type_image');
viewCard.classList.add('popup_is-animated');
const cardsList = content.querySelector('.places__list');
cardsList.addEventListener('click', (evt) => {openCard(evt)})
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", (evt) => {handleOpenEditModal(evt, editModal)});

const addPopupEventListeners = (popup) => {
  const closeBtn = popup.querySelector(".popup__close");
  closeBtn.addEventListener('click', (evt) => {handleCloseModal(evt, popup);});
  document.addEventListener('click', (evt) => {modal.overlayClickEventHandler(evt, popup);});
  document.addEventListener('keydown', modal.handleEscKeyDown);
};

const handleOpenEditModal = (evt, popup) => {
  const form = popup.querySelector(".popup__form");
  form.querySelector('.popup__input_type_name').value = content.querySelector('.profile__title').textContent;
  form.querySelector('.popup__input_type_description').value = content.querySelector('.profile__description').textContent;
  handleOpenModal(evt, popup);
};

const handleOpenModal = (evt, popup) => {
  modal.openModal(popup);
  addPopupEventListeners(popup);
};

const removePopupEventListeners = (popup) => {
  const closeBtn = popup.querySelector(".popup__close"); 
  closeBtn.removeEventListener('click', (evt) => {handleCloseModal(evt, elem);});
  document.removeEventListener('keydown', modal.handleEscKeyDown);
  document.removeEventListener('click', (evt) => {modal.overlayClickEventHandler(evt, popup);}); 
};

const handleCloseModal = (evt, popup) => {
  modal.closeModal(popup);
  removePopupEventListeners(popup);
};

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", (evt) => {handleOpenModal(evt, addCardModal)}); 

const handleEditProfileSubmitEvent = (evt, popup, form) => {
  evt.preventDefault();
  const newName = form.querySelector('.popup__input_type_name').value;
  const newDescription = form.querySelector('.popup__input_type_description').value;
  const titleField = content.querySelector('.profile__title');
  const descriptionField = content.querySelector('.profile__description');
  if ((newName.length > 0) && (newDescription.length > 0)) {
    titleField.textContent = newName;
    descriptionField.textContent = newDescription;
    form.reset();
  }
  handleCloseModal(evt, popup);
};

const handleAddCardSubmitEvent = (evt, popup, form) => {
  evt.preventDefault();
  const newCard = form.querySelector('.popup__input_type_card-name').value;
  const newUrl = form.querySelector('.popup__input_type_url').value;
  const newCardElem = card.createCard({name: newCard, link: newUrl}, card.removeCard, card.likeCard);
  const cardsList = document.querySelector('.places__list');
  cardsList.prepend(newCardElem);
  form.reset();
  handleCloseModal(evt, popup);
};

const addSubmitButtonEventListener = function(popup) {
  const form = popup.querySelector(".popup__form");
  if (popup.classList.contains('popup_type_edit')) {
    form.addEventListener('submit', (evt) => {handleEditProfileSubmitEvent(evt, popup, form)});
  } else if (popup.classList.contains('.popup_type_new-card')) {
    form.addEventListener('submit', (evt) => {handleAddCardSubmitEvent(evt, popup, form)});
  }
};

addSubmitButtonEventListener(editModal);
addSubmitButtonEventListener(addCardModal);

const cardPopup = content.querySelector(".popup_type_image");
const openCard = function(evt) {
  const cardElement = evt.target;
  let picture, title;
  if (cardElement.classList.contains('card__description')) {
    title = cardElement.querySelector('.card__title').textContent;
    picture = cardElement.parentNode.querySelector('.card__image').src;
  } else if (cardElement.classList.contains('card__image')) {
    picture = cardElement.src;
    title = cardElement.parentNode.querySelector('.card__title').textContent;
  } else if (cardElement.classList.contains('card__title')) {
    title = cardElement.textContent;
    picture = cardElement.parentNode.parentNode.querySelector('.card__image').src;
  }
  cardPopup.querySelector(".popup__image").src = picture;
  cardPopup.querySelector(".popup__caption").textContent = title;
  handleOpenModal(evt, cardPopup);
};

showCards(initialCards);