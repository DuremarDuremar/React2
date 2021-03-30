const updateFilmLog = (state, action) => {
  if (state === undefined) {
    return {
      submit: true,
      name: "",
      login: false,
      url: "users/login",
      emailLog: "",
      passwordLog: "",
      error: null,
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
    case "ENTER":
      return {
        ...state.filmLog,
        emailLog: action.payloadEmail,
        passwordLog: action.payloadPassword,
      };
    case "ERROR":
      return {
        ...state.filmLog,
        error: action.payload,
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
