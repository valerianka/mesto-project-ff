const overlayClickEventHandler = function(evt, elem) {
  if (evt.target === elem) {
    closeModal(elem);
  }
};

const openModal = function(elem) {
  elem.classList.add('popup_is-opened');
};

const closeModal = function(elem) {
  elem.classList.remove('popup_is-opened');
};

const handleEscKeyDown = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}; 

export {openModal, closeModal, handleEscKeyDown, overlayClickEventHandler};