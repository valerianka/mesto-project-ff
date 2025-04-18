const handleOverlayClickEvent = function(evt, elem) {
  if (elem && evt.target === elem) {
    closeModal(elem);
  }
};

const openModal = function(elem) {
  if (elem) {
    elem.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyDown);
  }
};

const closeModal = function(elem) {
  if (elem) {
    elem.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyDown);
  }
};

const handleEscKeyDown = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export {openModal, closeModal, handleOverlayClickEvent};
