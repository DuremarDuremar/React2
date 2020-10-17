const filmLoaded = (newFilm, str) => {
  return {
    type: "FILMS_LOADED",
    payload: newFilm,
    str: str,
  };
};

export { filmLoaded };
