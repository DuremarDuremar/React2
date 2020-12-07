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

const logLogin = (log) => {
  return {
    type: "LOGIN",
    payload: log,
  };
};

const logName = (name) => {
  return {
    type: "NAME",
    payload: name,
  };
};

const logSubmit = (sub) => {
  return {
    type: "SUBMIT",
    payload: sub,
  };
};

const logUrl = (url) => {
  return {
    type: "URL",
    payload: url,
  };
};

const res1200 = (res) => {
  return {
    type: "1200",
    payload: res,
  };
};

export {
  filmLoaded,
  filmActive,
  filmBuy,
  filmTotal,
  logLogin,
  logName,
  logSubmit,
  logUrl,
  res1200,
};
