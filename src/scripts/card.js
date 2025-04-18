
import {openModal} from './modal.js';
// @todo: Темплейт карточки
const cardTemplateElement = document.querySelector("#card-template").content;

// @todo: DOM узлы

const likeCard = function (cardElement) {
  cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
};

// @todo: Функция создания карточки
function createCard(card, cardPopup) {
  const newCardElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);

  newCardElement.querySelector(".card__image").src = card.link;
  newCardElement.querySelector(".card__title").textContent = card.name;
  newCardElement.querySelector(".card__image").alt = 'Фотография города';
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => { evt.stopPropagation(); removeCard(newCardElement);});
  newCardElement.querySelector(".card__like-button").addEventListener("click", (evt) => { evt.stopPropagation(); likeCard(newCardElement);});
  newCardElement.addEventListener("click", (evt) => {openCard(evt, newCardElement, cardPopup);});
  return newCardElement;
}

// @todo: Функция удаления карточки
const removeCard = function (cardElement) {
  cardElement.remove();
};

const openCard = function(evt, cardElement, cardPopup) {
  cardPopup.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;
  cardPopup.querySelector('.popup__image').src = cardElement.querySelector('.card__image').src;
  cardPopup.alt = cardElement.alt;
  openModal(cardPopup);
}

export {createCard};