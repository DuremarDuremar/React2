import updateFilmData from "./filmData";
import updateFilmCart from "./filmCart";
import updateFilmLog from "./filmLog";
// import updateFilmList from "./filmList";
// import upadateAuthentication from "./authentication";

const reducer = (state, action) => {
  console.log(action.type);
  return {
    filmData: updateFilmData(state, action),
    filmCart: updateFilmCart(state, action),
    filmLog: updateFilmLog(state, action),
    // authentication: upadateAuthentication(state, action),
  };
};

export default reducer;
