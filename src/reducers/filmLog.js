const updateFilmLog = (state, action) => {
  if (state === undefined) {
    return {
      submit: true,
      name: "",
      login: false,
      url: "users/login",
    };
  }

  switch (action.type) {
    case "SUBMIT":
      return {
        ...state.filmLog,
        submit: action.payload,
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
    case "URL":
      return {
        ...state.filmLog,
        url: action.payload,
      };
    default:
      return state.filmLog;
  }
};

export default updateFilmLog;
