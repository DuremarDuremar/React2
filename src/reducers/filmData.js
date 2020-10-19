const updateFilmData = (state, action) => {
  if (state === undefined) {
    return {
      films: [],
    };
  }

  switch (action.type) {
    case "FILMS_LOADED":
      return {
        ...state.filmData,
        films: action.payload,
      };
    default:
      return state.filmData;
  }
};

export default updateFilmData;
