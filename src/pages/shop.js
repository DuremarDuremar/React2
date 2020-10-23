import React, { useState } from "react";
import { connect } from "react-redux";
import { sortBy } from "lodash";
import "./shop.scss";

const Shop = ({ films }) => {
  const [stateShop, setStateShop] = useState("All");

  console.log(stateShop);

  const filmsYear = sortBy(films, ["year"]);

  return (
    <div className="shop">
      <div className="shop__sidebar">
        <div className="shop__nav">
          <h4>Catagories</h4>
          <ul>
            <li onClick={() => setStateShop("All")}>All</li>
            <li onClick={() => setStateShop("Year")}>Year</li>
            <li onClick={() => setStateShop("Country")}>Country</li>
            <li onClick={() => setStateShop("Price")}>Price</li>
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
      {films && stateShop == "All" && (
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
      {films && stateShop == "Year" && (
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
      {films && stateShop == "Country" && (
        <div className="shop__content">{films.map((film) => film.country)}</div>
      )}
      {films && stateShop == "Price" && (
        <div className="shop__content">{films.map((film) => film.price)}</div>
      )}
    </div>
  );
};

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

export default connect(mapStateToProps)(Shop);
