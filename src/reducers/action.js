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

const res1280 = (res) => {
  return {
    type: "1280",
    payload: res,
  };
};

const res1250 = (res) => {
  return {
    type: "1250",
    payload: res,
  };
};

const res1200 = (res) => {
  return {
    type: "1200",
    payload: res,
  };
};

const res1000 = (res) => {
  return {
    type: "1000",
    payload: res,
  };
};

const res820 = (res) => {
  return {
    type: "820",
    payload: res,
  };
};

const res600 = (res) => {
  return {
    type: "600",
    payload: res,
  };
};

const res470 = (res) => {
  return {
    type: "470",
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
  res1250,
  res1280,
  res1000,
  res820,
  res600,
  res470,
};
