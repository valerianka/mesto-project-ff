// @todo: Темплейт карточки
const cardTemplateElement = document.querySelector("#card-template").content;

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
  newCardElement.addEventListener("click", (evt) => {openCard(newCardElement);});
  return newCardElement;
}

// @todo: Функция удаления карточки
const removeCard = function (cardElement) {
  cardElement.remove();
};


export {createCard, removeCard, likeCard};
