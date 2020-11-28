const updateFilmLog = (state, action) => {
  if (state === undefined) {
    return {
      submit: true,
      name: "",
      login: false,
      email: "",
      password: "",
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
    case "REG":
      return {
        ...state.filmLog,
        email: action.payloadEmail,
        password: action.payloadPassword,
      };
    default:
      return state.filmLog;
  }
};

export default updateFilmLog;
