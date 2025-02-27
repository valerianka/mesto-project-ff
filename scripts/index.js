// @todo: Темплейт карточки
const cardTemplateElement = document.querySelector("#card-template").content;

// @todo: DOM узлы
let contentElement = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, removeCard) {
  let newCardElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);

  newCardElement.querySelector(".card__image").src = card.link;
  newCardElement.querySelector(".card__title").textContent = card.name;
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => removeCard(newCardElement));

  return newCardElement;
}

// @todo: Функция удаления карточки
let removeCard = function (cardElement) {
  let cardsArray = contentElement.querySelectorAll(".card");

  cardsArray.forEach((currentCardElement) => {
    if (currentCardElement === cardElement) {
      currentCardElement.remove();
    }
  });
};

// @todo: Вывести карточки на страницу
function showCards(cards) {
  cards.forEach((card) =>
    contentElement.appendChild(createCard(card, removeCard)),
  );
}

showCards(initialCards);
