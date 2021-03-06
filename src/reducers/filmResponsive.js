const updateFilmResponsive = (state, action) => {
  if (state === undefined) {
    return {
      pages1280: true,
      pages1250: true,
      pages1200: true,
      pages1000: true,
      pages820: true,
      pages600: true,
      pages470: true,
    };
  }

  switch (action.type) {
    case "470":
      return {
        ...state.filmResponsive,
        pages470: action.payload,
      };

    case "600":
      return {
        ...state.filmResponsive,
        pages600: action.payload,
      };

    case "820":
      return {
        ...state.filmResponsive,
        pages820: action.payload,
      };

    case "1000":
      return {
        ...state.filmResponsive,
        pages1000: action.payload,
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
    case "1280":
      return {
        ...state.filmResponsive,
        pages1280: action.payload,
      };
    default:
      return state.filmResponsive;
  }
};

export default updateFilmResponsive;
