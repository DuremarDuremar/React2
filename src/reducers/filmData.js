const updateFilmData = (state, action) => {
  if (state === undefined) {
    return {
      films: 0,
    };
  }

  switch (action.type) {
    case "FILMS_LOADED":
      return {
        ...state.filmData,
        films: 1,
      };
    default:
      return state.filmData;
  }
};

export default updateFilmData;
