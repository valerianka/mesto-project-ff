const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
// @todo: Темплейт карточки
const cardTemplateElement = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

const likeCard = function (cardElement) {
  cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
};


// @todo: Функция создания карточки
function createCard(card, removeCard, likeCard, openCard) {
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
  return newCardElement;
}

// @todo: Функция удаления карточки
const removeCard = function (cardElement) {
  cardElement.remove();
};

// @todo: Вывести карточки на страницу
const showCards = function(cards) {
  cards.forEach((card) =>
    cardsList.appendChild(createCard(card, removeCard, likeCard)),
  );
}

export {initialCards, createCard, removeCard, showCards, likeCard};