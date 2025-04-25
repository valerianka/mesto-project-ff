const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-36",
  token: "52e49045-4d80-4343-9c28-1bd24ec0f58c",
};

export const getCardsRequest = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: config.token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`getCardsRequest failed: ${res.status}`);
  });
};

export const getProfileRequest = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`getProfileRequest failed: ${res.status}`);
  });
};

export const updateProfile = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profile.name,
      about: profile.about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log("Update unsuccessful: ", err));
};

export const setCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log("Something went wrong: ", err));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Something went wrong: ", err);
    });
};

export const incrementLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Something went wrong: ", err);
    });
};

export const decrementLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Something went wrong: ", err);
    });
};

export const changeAvatar = (imageUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: imageUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject();
      }
    })
    .catch((err) => {
      console.log("Something went wrong: ", err);
    });
};
