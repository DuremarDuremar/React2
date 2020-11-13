const filmLoaded = (newFilm) => {
  return {
    type: "FILMS_LOADED",
    payload: newFilm,
  };
};

const filmActive = (film) => {
  return {
    type: "FILM",
    payload: film,
  };
};

const filmBuy = (cart) => {
  return {
    type: "BUY",
    payload: cart,
  };
};

const filmTotal = (total) => {
  return {
    type: "TOTAL",
    payload: total,
  };
};

export { filmLoaded, filmActive, filmBuy, filmTotal };
