import updateFilmData from "./filmData";
import updateFilmCart from "./filmCart";
import updateFilmLog from "./filmLog";
import updateFilmResponsive from "./filmResponsive";

const reducer = (state, action) => {
  // console.log(action.type);
  return {
    filmData: updateFilmData(state, action),
    filmCart: updateFilmCart(state, action),
    filmLog: updateFilmLog(state, action),
    filmResponsive: updateFilmResponsive(state, action),
  };
};

export default reducer;
