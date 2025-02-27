// @todo: Темплейт карточки
const cardTemplateElement = document.querySelector("#card-template").content;

// @todo: DOM узлы
const contentElement = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, removeCard) {
  const newCardElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);

  newCardElement.querySelector(".card__image").src = card.link;
  newCardElement.querySelector(".card__title").textContent = card.name;
  newCardElement.querySelector(".card__image").alt = 'Фотография города';
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => removeCard(newCardElement));

  return newCardElement;
}

// @todo: Функция удаления карточки
const removeCard = function (cardElement) {
  cardElement.remove();
};

// @todo: Вывести карточки на страницу
function showCards(cards) {
  cards.forEach((card) =>
    contentElement.appendChild(createCard(card, removeCard)),
  );
}

showCards(initialCards);
