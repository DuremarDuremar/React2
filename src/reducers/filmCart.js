const updateFilmCart = (state, action) => {
  if (state === undefined) {
    return {
      buy: [],
      total: 0,
    };
  }

  switch (action.type) {
    case "BUY":
      return {
        ...state.filmCart,
        buy: [...state.filmCart.buy, action.payload],
      };
    case "TOTAL":
      return {
        ...state.filmCart,
        total: action.payload,
      };
    default:
      return state.filmCart;
  }
};

export default updateFilmCart;
