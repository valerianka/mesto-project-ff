import "../pages/index.css";
import * as card from "./card.js";
import * as modal from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getCardsRequest,
  getProfileRequest,
  updateProfile,
  setCard,
  changeAvatar,
} from "./api.js";

let userId = "";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const content = document.querySelector(".page__content");
const profile = content.querySelector(".profile");
const profileImage = profile.querySelector(".profile__image");

const editModal = content.querySelector(".popup_type_edit");
editModal.classList.add("popup_is-animated");
const editForm = editModal.querySelector(".popup__form");
const editFormNameField = editForm.querySelector(".popup__input_type_name");
const editFormDescriptionField = editForm.querySelector(
  ".popup__input_type_description",
);
const editFormButton = editForm.querySelector(".popup__button");

const profileTitleField = content.querySelector(".profile__title");
const profileDescriptionField = content.querySelector(".profile__description");

const editProfileImageModal = content.querySelector(
  ".popup_type_edit_profile_image",
);
editProfileImageModal.classList.add("popup_is-animated");
const editProfileImageForm =
  editProfileImageModal.querySelector(".popup__form");
const editProfileImageUrlField = editProfileImageForm.querySelector(
  ".popup__input_type_url",
);
const editProfileImageButton =
  editProfileImageForm.querySelector(".popup__button");
const editButton = document.querySelector(".profile__edit-button");

const addCardModal = content.querySelector(".popup_type_new-card");
addCardModal.classList.add("popup_is-animated");
const addCardForm = addCardModal.querySelector(".popup__form");
const addCardFormNameField = addCardForm.querySelector(
  ".popup__input_type_card-name",
);
const addCardFormUrlField = addCardForm.querySelector(".popup__input_type_url");
const addCardFormButton = addCardForm.querySelector(".popup__button");
const addButton = document.querySelector(".profile__add-button");

const viewCard = content.querySelector(".popup_type_image");
viewCard.classList.add("popup_is-animated");
const viewCardTitle = viewCard.querySelector(".popup__caption");
const viewCardImage = viewCard.querySelector(".popup__image");

const cardsList = content.querySelector(".places__list");

editButton.addEventListener("click", (evt) => {
  editFormNameField.value = profileTitleField.textContent;
  editFormDescriptionField.value = profileDescriptionField.textContent;
  clearValidation(editForm, validationConfig);
  modal.openModal(editModal);
});
addButton.addEventListener("click", (evt) => {
  clearValidation(addCardForm, validationConfig);
  modal.openModal(addCardModal);
});
profileImage.addEventListener("click", (evt) => {
  clearValidation(editProfileImageForm, validationConfig);
  modal.openModal(editProfileImageModal);
});

const addPopupEventListeners = (popup) => {
  if (!popup) {
    console.log("addPopupEventListeners call wasn't successful");
    return;
  }
  const closeBtn = popup.querySelector(".popup__close");
  closeBtn.addEventListener("click", (evt) => {
    modal.closeModal(popup);
  });
  popup.addEventListener("click", (evt) => {
    modal.handleOverlayClickEvent(evt, popup);
  })
};

const handleEditProfileSubmitEvent = (evt) => {
  evt.preventDefault();
  editFormButton.textContent = "Сохранение...";
  updateProfile({
    name: editFormNameField.value,
    about: editFormDescriptionField.value,
  }).then((result) => {
    profileTitleField.textContent = result.name;
    profileDescriptionField.textContent = result.about;
    evt.target.reset();
    modal.closeModal(editModal);
  })
  .catch((err) => {
    console.log("Error editing profile: ", err);
  })
  .finally(() => {
    editFormButton.textContent = "Сохранить"; 
  });
};

const handleAddCardSubmitEvent = (evt) => {
  evt.preventDefault();
  addCardFormButton.textContent = "Сохранение...";
  setCard({
    name: addCardFormNameField.value,
    link: addCardFormUrlField.value,
  }).then((result) => {
    const newCardElem = card.createCard(
      result,
      card.removeCard,
      card.likeCard,
      openCard,
      userId,
    );
    cardsList.prepend(newCardElem);
    evt.target.reset();
    modal.closeModal(addCardModal);
  }).catch(err =>
    console.log("Error adding new card: ", err)
  ).finally(err => {
    addCardFormButton.textContent = "Сохранить";
  })
};

const handleEditProfileImageSubmitEvent = (evt) => {
  evt.preventDefault();
  editProfileImageButton.textContent = "Сохранение...";
  changeAvatar(editProfileImageUrlField.value)
    .then((result) => {
      profileImage.style = `background-image: url(${result.avatar})`;
      editProfileImageForm.reset();
      modal.closeModal(editProfileImageModal);
    })
    .catch((err) => {
      console.log("Error changing avatar: ", err)})
    .finally(() => {
      editProfileImageButton.textContent = "Сохранить";
    })
};

const openCard = function (card) {
  if (!card) {
    console.log("The card doesn't exist");
    return;
  }
  viewCardTitle.textContent = card.title;
  viewCardImage.src = card.link;
  viewCardImage.alt = "Изображение";
  modal.openModal(viewCard);
};

const showCards = function (cards, profile_id) {
  if (!cards) {
    console.log("No cards available");
    return;
  }
  cards.forEach((cardElem) => {
    if (cardElem.owner._id !== profile_id) {
      cardsList.appendChild(
        card.createCard(cardElem, null, card.likeCard, openCard, userId),
      );
    } else {
      cardsList.appendChild(
        card.createCard(
          cardElem,
          card.removeCard,
          card.likeCard,
          openCard,
          userId,
        ),
      );
    }
  });
};

const showProfile = function (profile) {
  if (profile) {
    profileTitleField.textContent = profile.name;
    profileDescriptionField.textContent = profile.about;
    profileImage.style = `background-image: url(${profile.avatar});`;
  } else {
    console.log("Profile is null or empty");
  }
};

addPopupEventListeners(editModal);
addPopupEventListeners(addCardModal);
addPopupEventListeners(viewCard);
addPopupEventListeners(editProfileImageModal);
editForm.addEventListener("submit", handleEditProfileSubmitEvent);
addCardForm.addEventListener("submit", handleAddCardSubmitEvent);
editProfileImageForm.addEventListener(
  "submit",
  handleEditProfileImageSubmitEvent,
);

Promise.all([getProfileRequest(), getCardsRequest()])
  .then(([profile, cards]) => {
    userId = profile._id;
    showProfile(profile);
    showCards(cards, userId);
  })
  .catch((error) => {
    console.log("Something went wrong:", error);
  });
enableValidation(validationConfig);
