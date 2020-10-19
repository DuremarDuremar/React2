const filmLoaded = (newFilm) => {
  return {
    type: "FILMS_LOADED",
    payload: newFilm,
  };
};

export { filmLoaded };
