const updateFilmResponsive = (state, action) => {
  if (state === undefined) {
    return {
      pages1200: true,
    };
  }

  switch (action.type) {
    case "1200":
      return {
        ...state.filmResponsive,
        pages1200: action.payload,
      };
    default:
      return state.filmResponsive;
  }
};

export default updateFilmResponsive;
