import { deleteCard, incrementLikes, decrementLikes } from "./api";

const cardTemplateElement = document.querySelector("#card-template").content;

const likeCard = function (cardElement, cardId) {
  const cardLikesCountField = cardElement.querySelector(".card__like-count");
  if (
    cardElement
      .querySelector(".card__like-button")
      .classList.contains("card__like-button_is-active")
  ) {
    decrementLikes(cardId).then((result) => {
      cardLikesCountField.textContent =
        result.likes.length > 0 ? result.likes.length : "";
    });
  } else {
    incrementLikes(cardId).then(
      (result) => (cardLikesCountField.textContent = result.likes.length),
    );
  }
  cardElement
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_is-active");
};

function createCard(card, removeCard, likeCard, openCard, userId) {
  const newCardElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);
  newCardElement.querySelector(".card__image").src = card.link;
  newCardElement.querySelector(".card__title").textContent = card.name;
  newCardElement.querySelector(".card__image").alt = "Фотография города";
  if (removeCard) {
    newCardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        evt.stopPropagation();
        removeCard(newCardElement, card._id);
      });
  } else {
    newCardElement
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button-disabled");
    newCardElement.querySelector(".card__delete-button").disaled = true;
  }
  if (card.likes) {
    newCardElement.querySelector(".card__like-count").textContent =
      card.likes.length > 0 ? card.likes.length : "";
    if (card.likes.some((like) => like._id === userId)) {
      newCardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_is-active");
    }
  }
  newCardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      evt.stopPropagation();
      likeCard(newCardElement, card._id);
    });
  newCardElement.addEventListener("click", (evt) => {
    openCard(newCardElement);
  });
  return newCardElement;
}

const removeCard = function (cardElement, cardId) {
  deleteCard(cardId).then(result => {
    if (result) {
      cardElement.remove();
    } else {
      throw new Error("Error deleting the card");
    }
  })
  .catch(err => {
    console.log("Error deleting the card: ", err);
  });
};

export { createCard, removeCard, likeCard};
