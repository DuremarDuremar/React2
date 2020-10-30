import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sortBy, chunk } from "lodash";
import shuffle from "../utils/shuffle";
import search from "../utils/search";
import "./shop.scss";

const Shop = ({ films }) => {
  // стэйт активной кнопки
  const [stateShop, setStateShop] = useState("All");
  // стэйт направления стрелки и сортировки массива
  const [stateArrow, setStateArrow] = useState(true);
  // стэйт для перемешевания
  const [filmsRandom, setFilmsRandom] = useState(false);
  // стэйт для пагинации
  const [shopAllPage, setShopAllPage] = useState(null);
  const [shopPage, setShopPage] = useState(0);
  // стэйт для поиска
  const [shopValue, setShopValue] = useState("");

  useEffect(() => {
    if (films) {
      setShopAllPage(chunk(films, 12));
    }
  }, [films]);

  //создаем переменную для изменения направления стрелки
  const classI =
    stateArrow === true ? "fas fa-arrow-down fa-xs" : "fas fa-arrow-up fa-xs";

  //делаем кнопку активной и меняем положение стрелки при повторном нажатии
  const changeArrow = (e) => {
    if (stateShop === e.id) {
      setStateArrow(!stateArrow);
    } else {
      setStateArrow(true);
    }

    setStateShop(e.id);
  };

  //делаем кнопку активной для "All" , при повторном нажатии сортирум заново случаным образом
  const changeFilms = (e) => {
    setStateShop(e.id);

    if (stateShop === e.id) {
      shuffle(films);
      setFilmsRandom(!filmsRandom);
    }
  };

  // добовляем видимость стрелки при активной кнопки, стрелка моежет быть вверх или вниз
  const arrow = (classI, state) => {
    if (state === stateShop) {
      return <i className={classI}></i>;
    }
  };
  // добовляем видимость значка для "All"
  const all = (state) => {
    if (state === stateShop) {
      return <i className="fas fa-infinity"></i>;
    }
  };

  // создаем поиск
  if (films) {
    const title = films.map((item) => item.title);
    const arrFilms = search(title, shopValue);
    console.log(arrFilms);
  }

  console.log("shopValue", shopValue);

  //создаем переменные для осортрованных по типу массивов, в зависемости от направления стрелки
  const filmsYear = stateArrow
    ? sortBy(films, ["year"])
    : sortBy(films, ["year"]).reverse();
  const filmsPrice = stateArrow
    ? sortBy(films, ["price"])
    : sortBy(films, ["price"]).reverse();
  const filmsCountry = stateArrow
    ? sortBy(films, ["country"])
    : sortBy(films, ["country"]).reverse();

  return (
    <div className="shop">
      <div className="shop__sidebar">
        <div className="shop__nav">
          <h4>Catagories</h4>
          <ul>
            <li
              onClick={(e) => changeFilms(e.currentTarget)}
              className={stateShop === "All" ? "activeLi" : null}
              id="All"
            >
              All {all("All")}
            </li>
            <li
              onClick={(e) => changeArrow(e.currentTarget)}
              className={stateShop === "Year" ? "activeLi" : null}
              id="Year"
            >
              Year {arrow(classI, "Year")}
            </li>
            <li
              onClick={(e) => changeArrow(e.currentTarget)}
              className={stateShop === "Country" ? "activeLi" : null}
              id="Country"
            >
              Country {arrow(classI, "Country")}
            </li>
            <li
              onClick={(e) => changeArrow(e.currentTarget)}
              className={stateShop === "Price" ? "activeLi" : null}
              id="Price"
            >
              Price {arrow(classI, "Price")}
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
              onChange={(e) => setShopValue(e.target.value)}
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
          {chunk(films, 12)[shopPage].map((film) => (
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
          {chunk(filmsYear, 12)[shopPage].map((film) => (
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
          {chunk(filmsCountry, 12)[shopPage].map((film) => (
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
          {chunk(filmsPrice, 12)[shopPage].map((film) => (
            <div key={film.id} className="shop__content_item">
              <h3>{film.price}$</h3>
              <img src={film.image} alt={film.title} />
              <div className="shop__content_price">{film.price} $</div>
            </div>
          ))}
        </div>
      )}
      <div className="shop__pagination">
        {shopAllPage &&
          shopAllPage.map((page, indexPage) => (
            <div
              key={indexPage}
              onClick={() => setShopPage(indexPage)}
              className={indexPage === shopPage ? "activePage" : null}
            >
              {indexPage + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

export default connect(mapStateToProps)(Shop);
