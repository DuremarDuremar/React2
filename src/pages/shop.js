import React, { useState } from "react";
import { connect } from "react-redux";
import { sortBy } from "lodash";
import classNames from "classnames";
import "./shop.scss";

const Shop = ({ films }) => {
  const [stateShop, setStateShop] = useState("All");

  const [stateArrow, setStateArrow] = useState(true);

  const classI =
    stateArrow === true ? "fas fa-arrow-down fa-xs" : "fas fa-arrow-up fa-xs";

  const changeArrow = (e) => {
    if (stateShop === e.id) {
      setStateArrow(!stateArrow);
    }

    console.log(e);
    console.log(stateArrow);
    setStateShop(e.id);

    // e.classList.toggle("activeLi");

    // if ((e.id = stateShop)) {
    //   setStateArrow(
    //     stateArrow === "fas fa-arrow-up"
    //       ? "fas fa-arrow-down"
    //       : "fas fa-arrow-up"
    //   );
    // }
  };

  // const liClasses = classNames({
  //   if(stateShop = this.title) {
  //     return "activeLi";
  //   },
  // });

  // console.log(stateShop);

  const filmsYear = sortBy(films, ["year"]);
  const filmsPrice = sortBy(films, ["price"]);
  const filmsCountry = sortBy(films, ["country"]);

  // console.log("filmsPrice", sortBy(films, ["price"]).reverse());

  return (
    <div className="shop">
      <div className="shop__sidebar">
        <div className="shop__nav">
          <h4>Catagories</h4>
          <ul>
            <li
              onClick={() => setStateShop("All")}
              className={stateShop === "All" ? "activeLi" : null}
            >
              All <i className="fas fa-infinity"></i>
            </li>
            <li
              onClick={(e) => changeArrow(e.currentTarget)}
              className={stateShop === "Year" ? "activeLi" : null}
              id="Year"
            >
              Year <i className={classI}></i>
            </li>
            <li
              onClick={(e) => changeArrow(e.currentTarget)}
              className={stateShop === "Country" ? "activeLi" : null}
              id="Country"
            >
              Country <i className={classI}></i>
            </li>
            <li
              onClick={(e) => changeArrow(e.currentTarget)}
              className={stateShop === "Price" ? "activeLi" : null}
              id="Price"
            >
              Price <i className={classI}></i>
            </li>
          </ul>
        </div>
      </div>
      <div className="shop__header">
        <div className="shop__form">
          <form>
            <input
              className="shop__search_title"
              type="text"
              placeholder="film"
            />
            <button>go</button>
          </form>

          <form>
            <input
              className="shop__search_autor"
              type="text"
              placeholder="autor"
            />
            <button>go</button>
          </form>
        </div>
      </div>
      {films && stateShop === "All" && (
        <div className="shop__content">
          {films.map((film) => (
            <div key={film.id} className="shop__content_item">
              <h3>{film.title}</h3>
              <img src={film.image} alt={film.title} />
              <div className="shop__content_price">{film.price} $</div>
            </div>
          ))}
        </div>
      )}
      {films && stateShop === "Year" && (
        <div className="shop__content">
          {filmsYear.map((film) => (
            <div key={film.id} className="shop__content_item">
              <h3>{film.year}</h3>
              <img src={film.image} alt={film.title} />
              <div className="shop__content_price">{film.price} $</div>
            </div>
          ))}
        </div>
      )}
      {films && stateShop === "Country" && (
        <div className="shop__content">
          {filmsCountry.map((film) => (
            <div key={film.id} className="shop__content_item">
              <h3>{film.country}</h3>
              <img src={film.image} alt={film.title} />
              <div className="shop__content_price">{film.price} $</div>
            </div>
          ))}
        </div>
      )}
      {films && stateShop === "Price" && (
        <div className="shop__content">
          {filmsPrice.map((film) => (
            <div key={film.id} className="shop__content_item">
              <h3>{film.price}$</h3>
              <img src={film.image} alt={film.title} />
              <div className="shop__content_price">{film.price} $</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

export default connect(mapStateToProps)(Shop);
