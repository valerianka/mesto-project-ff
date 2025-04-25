const enableValidation = (validationConfig) => {
  /* validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  } */
  if (!validationConfig) {
    console.log("Empty validaiton config");
    return;
  }
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector),
  );
  if (!formList) {
    console.log("No forms available for validation");
  } else {
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  }
};

function clearValidation(profileForm, validationConfig) {
  if (!profileForm || !validationConfig) {
    console.log("Empty profile form or validation config");
    return;
  }
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector),
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector,
  );
  inputList.forEach((inputElement) =>
    hideInputError(profileForm, inputElement, validationConfig),
  );
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig,
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig,
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = function (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = function (
  inputList,
  buttonElement,
  validationConfig,
) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector,
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export { enableValidation, clearValidation };
