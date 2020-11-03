const updateFilmCart = (state, action) => {
  if (state === undefined) {
    return {
      buy: [],
      total: null,
    };
  }

  switch (action.type) {
    case "BUY":
      console.log(state.filmCart.buy);
      return {
        ...state.filmCart,
        buy: [...state.filmCart.buy, action.payload],
      };

    default:
      return state.filmCart;
  }
};

export default updateFilmCart;
