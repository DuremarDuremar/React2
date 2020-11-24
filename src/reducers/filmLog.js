const updateFilmLog = (state, action) => {
  if (state === undefined) {
    return {
      loading: false,
      name: "",
      login: false,
    };
  }

  switch (action.type) {
    case "LOADING":
      return {
        ...state.filmLog,
        loading: action.payload,
      };
    case "LOGIN":
      return {
        ...state.filmLog,
        login: action.payload,
      };
    case "NAME":
      return {
        ...state.filmLog,
        name: action.payload,
      };
    default:
      return state.filmLog;
  }
};

export default updateFilmLog;
