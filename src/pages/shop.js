import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { filmActive } from "../reducers/action";
import { sortBy, chunk } from "lodash";
import shuffle from "../utils/shuffle";
import { titleSearch, authorSearch } from "../utils/search";
import styled from "styled-components";

const StylesShop = styled.div`
  .shop {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr 10.8fr 0.2fr;
    min-height: 100vh;
    grid-template-areas:
      "s h h h h"
      "s c c c c"
      "s p p p p";

    .shop__sidebar {
      grid-area: s;
      background-color: brown;
      .shop__nav {
        text-align: center;
        padding-top: 35px;
        h4 {
          font-size: 24px;
          padding-bottom: 5px;
          padding-top: 5px;
          border-bottom: 3px solid black;
          border-top: 3px solid black;
        }
        ul {
          li {
            font-family: "Sansita Swashed", cursive;
            cursor: pointer;
            font-size: 20px;
            font-weight: 500;
            padding-top: 15px;

            &:hover {
              background-color: #fff;
            }
          }
          .activeLi {
            &:after {
              content: "";
              display: block;
              width: 90px;
              height: 5px;
              background-color: black;
              margin: 0px auto;
            }
          }
        }
      }
    }
    .shop__header {
      grid-area: h;
      background-color: cadetblue;
      .shop__form {
        padding-top: 35px;
        display: flex;
        justify-content: space-evenly;
        form {
          input {
            width: 220px;
            padding: 10px 0 10px 5px;
            font-size: 16px;
            line-height: 16px;
            border: 2px solid black;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
          }
        }
      }
    }
    .shop__content {
      grid-area: c;
      background-color: darkorchid;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-row-gap: 10px;
      grid-column-gap: 2px;
      padding: 10px 5px 5px 5px;

      .shop__content_item {
        position: relative;

        h3 {
          text-align: center;
          font-size: 14px;
          padding-bottom: 4px;
        }
        img {
          width: 100%;
          height: 300px;
          display: block;
          margin: 0px auto;
        }
        .shop__content_price {
          position: absolute;
          bottom: 0;
          right: 0;
          color: #fff;
          background-color: #6d214f;
          padding: 10px;
          border-radius: 75%;
        }
        .shop__content_author {
          position: absolute;
          top: 40px;
          max-width: 100px;
          right: 5px;
          color: #fff;
          background-color: #6d214f;
          text-align: center;
          transform: rotate(10deg);
          font-size: 11px;
        }
      }
    }
    .shop__pagination {
      grid-area: p;
      display: flex;
      justify-content: center;
      padding: 5px 0;
      div {
        width: 50px;
        background-color: #6d214f;
        text-align: center;
        border-radius: 75%;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        &:hover {
          background-color: #fff;
        }
      }
      .activePage {
        border: 6px solid black;
      }
    }
    .shop__none.shop__none {
      display: block;
      p {
        font-family: "Sansita Swashed", cursive;
        text-align: center;
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 20px;
      }
      button {
        font-family: "Sansita Swashed", cursive;
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin: 0px auto;
        font-size: 13px;
        &:hover {
          border: 3px solid black;
        }
      }
    }
  }
`;

const Shop = ({ films, filmActive }) => {
  //стэйт для отображения
  const [arrShop, setArrShop] = useState(null);
  // стэйт активной кнопки
  const [stateShop, setStateShop] = useState("All");
  // стэйт направления стрелки и сортировки массива
  const [stateArrow, setStateArrow] = useState(true);
  // стэйт для перемешевания
  const [filmsRandom, setFilmsRandom] = useState(false);
  // стэйт для пагинации
  const [shopAllPage, setShopAllPage] = useState(null);
  const [shopPage, setShopPage] = useState(0);
  // стэйт для вывода ошибка при не нахождении в поиске
  const [shopNone, setShopNone] = useState(false);
  // стэйт для очистки value
  const [shopValueTitle, setShopValueTitle] = useState("");
  const [shopValueAuthor, setShopValueAuthor] = useState("");

  useEffect(() => {
    if (films) {
      setArrShop(films);
    }
  }, [films]);

  useEffect(() => {
    if (arrShop) {
      setShopAllPage(chunk(arrShop, 12));
    }
  }, [arrShop]);

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
  const searchTitle = (e) => {
    setShopValueTitle(e);
    let arr = titleSearch(films, e);
    if (arr.length === 0) {
      setShopNone(true);
    } else {
      setArrShop(arr);
      setShopNone(false);
    }
  };

  const searchAuthor = (e) => {
    setShopValueAuthor(e);
    let arr = authorSearch(films, e);
    if (arr.length === 0) {
      setShopNone(true);
    } else {
      setArrShop(arr);
      setShopNone(false);
    }
  };

  const searchReturn = () => {
    setShopNone(false);
    setArrShop(films);
    setShopValueTitle("");
    setShopValueAuthor("");
  };

  //создаем переменные для осортрованных по типу массивов, в зависемости от направления стрелки
  const filmsYear = stateArrow
    ? sortBy(arrShop, ["year"])
    : sortBy(arrShop, ["year"]).reverse();
  const filmsPrice = stateArrow
    ? sortBy(arrShop, ["price"])
    : sortBy(arrShop, ["price"]).reverse();
  const filmsCountry = stateArrow
    ? sortBy(arrShop, ["country"])
    : sortBy(arrShop, ["country"]).reverse();

  return (
    <StylesShop>
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
                onChange={(e) => searchTitle(e.target.value)}
                value={shopValueTitle}
              />
              {/* <button>go</button> */}
            </form>

            <form>
              <input
                className="shop__search_autor"
                type="text"
                placeholder="author"
                onChange={(e) => searchAuthor(e.target.value)}
                value={shopValueAuthor}
              />
              {/* <button>go</button> */}
            </form>
          </div>
        </div>
        {shopNone && (
          <div className="shop__content shop__none">
            <p>None</p>
            <button onClick={() => searchReturn()}> return </button>
          </div>
        )}
        {arrShop && stateShop === "All" && !shopNone && (
          <div className="shop__content">
            {chunk(arrShop, 12)[shopPage].map((film) => (
              <div
                key={film.id}
                className="shop__content_item"
                onClick={() => filmActive(film)}
              >
                <div className="shop__content_author">{film.author}</div>
                <h3>{film.title}</h3>
                <Link to="/film">
                  <img src={film.image} alt={film.title} />
                </Link>
                <div className="shop__content_price">{film.price} $</div>
              </div>
            ))}
          </div>
        )}
        {arrShop && stateShop === "Year" && !shopNone && (
          <div className="shop__content">
            {chunk(filmsYear, 12)[shopPage].map((film) => (
              <div
                key={film.id}
                className="shop__content_item"
                onClick={() => filmActive(film)}
              >
                <h3>{film.year}</h3>
                <Link to="/film">
                  <img src={film.image} alt={film.title} />
                </Link>
                <div className="shop__content_price">{film.price} $</div>
              </div>
            ))}
          </div>
        )}
        {arrShop && stateShop === "Country" && !shopNone && (
          <div className="shop__content">
            {chunk(filmsCountry, 12)[shopPage].map((film) => (
              <div
                key={film.id}
                className="shop__content_item"
                onClick={() => filmActive(film)}
              >
                <h3>{film.country}</h3>
                <Link to="/film">
                  <img src={film.image} alt={film.title} />
                </Link>
                <div className="shop__content_price">{film.price} $</div>
              </div>
            ))}
          </div>
        )}
        {arrShop && stateShop === "Price" && !shopNone && (
          <div className="shop__content">
            {chunk(filmsPrice, 12)[shopPage].map((film) => (
              <div
                key={film.id}
                className="shop__content_item"
                onClick={() => filmActive(film)}
              >
                <h3>{film.price}$</h3>
                <Link to="/film">
                  <img src={film.image} alt={film.title} />
                </Link>
                <div className="shop__content_price">{film.price} $</div>
              </div>
            ))}
          </div>
        )}
        <div className="shop__pagination">
          {shopAllPage &&
            !shopNone &&
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
    </StylesShop>
  );
};

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

const mapDispatchToProps = {
  filmActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
