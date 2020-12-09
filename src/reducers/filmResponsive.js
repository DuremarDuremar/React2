const updateFilmResponsive = (state, action) => {
  if (state === undefined) {
    return {
      pages1200: true,
      pages1250: true,
      pages820: true,
    };
  }

  switch (action.type) {
    case "820":
      return {
        ...state.filmResponsive,
        pages820: action.payload,
      };

    case "1200":
      return {
        ...state.filmResponsive,
        pages1200: action.payload,
      };

    case "1250":
      return {
        ...state.filmResponsive,
        pages1250: action.payload,
      };

    default:
      return state.filmResponsive;
  }
};

export default updateFilmResponsive;
