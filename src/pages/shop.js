import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { filmActive } from "../reducers/action";
import { sortBy, chunk } from "lodash";
import shuffle from "../utils/shuffle";
import { titleSearch, authorSearch } from "../utils/search";
import styled from "styled-components";

const StyledShop = styled.div`
  min-height: 100vh;
  display: grid;
  display: ${(props) => (props.pages600 ? "grid" : "block")};

  ${(props) =>
    props.none &&
    `
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 2fr 10fr;
    grid-template-areas:
      "s h h h h"
      "s n n n n";
      
  `}

  ${(props) =>
    props.pages1280 &&
    !props.none &&
    `
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr 10.8fr 0.2fr;
    grid-template-areas:
      "s h h h h"
      "s c c c c"
      "s p p p p"; 
  `}
  ${(props) =>
    !props.pages1280 &&
    props.pages820 &&
    !props.none &&
    `
    grid-template-columns: 2fr 3.33fr 3.33fr 3.33fr;
    grid-template-rows: 0.5fr 11fr 0.5fr;
    grid-template-areas:
    "s h h h"
    "s c c c"
    "s p p p";
  `}
   ${(props) =>
    !props.pages820 &&
    props.pages600 &&
    !props.none &&
    ` 
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 0.2fr 11fr 0.2fr;
  grid-template-areas:
    "s h h h h"
    "s c c c c"
    "s p p p p";
  `}

    

  

  

 

  

 


  .shop__null {
    display: none;
  }
`;

const ShopHeader = styled.div`
  grid-area: h;
  background-color: cadetblue;
`;

const ShopForm = styled.div`
  min-height: 80px;
  ${(props) =>
    props.pages600 &&
    `
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  `}
  ${(props) =>
    !props.pages600 &&
    `
    padding: 5px 0;
    display: block;
    text-align: center;
  `}

  
  form {
    input {
      width: ${(props) =>
        props.pages600 ? "calc(22vw + 20px)" : "calc(42vw + 20px)"};
      padding: 10px 0 10px 5px;
      font-size: 16px;
      line-height: 16px;
      border: 2px solid black;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
`;

const ShopContent = styled.div`
  grid-area: c;
  background-color: darkorchid;
  display: grid;
  height: ${(props) => props.none && "100vh"};

  ${(props) =>
    props.pages1250 &&
    `
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 2px;
  `}
  ${(props) =>
    !props.pages1250 &&
    props.pages820 &&
    `
    grid-template-columns: repeat(3, 1fr);
   
  `}
${(props) =>
    !props.pages820 &&
    props.pages600 &&
    `
    grid-template-columns: repeat(2, 1fr);
    
  `}
${(props) =>
    !props.pages600 &&
    props.pages470 &&
    `
    grid-template-columns: repeat(2, 1fr);
  
  `}
  ${(props) =>
    !props.pages470 &&
    `
    grid-template-columns: repeat(1, 1fr);
  
  `}
  grid-column-gap: 6px;
  grid-row-gap: 10px;
  padding: 10px 5px 5px 5px;
  overflow: hidden;
  .shop__content_item {
    position: relative;
    max-height: 320px;

    h3 {
      text-align: center;
      font-size: 13.5px;
      padding-bottom: 4px;
      white-space: nowrap;
    }
    img {
      display: block;
      margin: 0px auto;
      ${(props) =>
        props.pages1250 &&
        `
    width: 100%;
    min-height: 300px;
  `}

      ${(props) =>
        props.pages820 &&
        !props.pages1250 &&
        `
    width: 15vw;
    height: 23vw;
  `}


      ${(props) =>
        props.pages600 &&
        !props.pages820 &&
        `
    width: 26vw;
    height: 39vw;
  `}

      ${(props) =>
        props.pages470 &&
        !props.pages600 &&
        `
    width: 35vw;
    height: 52vw;
  `}

      ${(props) =>
        !props.pages470 &&
        `
    width: 50vw;
    height: 77vw;
  `}
    }
  }
  .shop__content_price {
    position: absolute;
    bottom: 0;
    right: 10px;
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
`;

const ShopNone = styled.div`
  grid-area: n;
  padding-top: 30px;

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
`;

const ShopBar = styled.div`
  grid-area: s;
  background-color: brown;

  .shopView {
    padding-top: 5px !important;
  }

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

    .h4Cursor {
      cursor: pointer;
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
      /* .activeLi {
        &:after {
          content: "";
          display: block;
          width: 90px;
          height: 5px;
          background-color: black;
          margin: 0px auto;
        }
      } */
    }
  }
`;

const ShopNav = styled.div`
  text-align: center;
  padding-top: ${(props) => (props.pages600 ? "35px" : "0")};

  h4 {
    font-size: 24px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-bottom: 3px solid black;
    border-top: 3px solid black;
  }

  .h4Cursor {
    cursor: pointer;
  }
  ul {
  }
`;

const Li = styled.li`
  font-family: "Sansita Swashed", cursive;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  padding-top: 15px;
  ${(props) =>
    props.active &&
    `
    &:after {
        content: "";
        display: block;
        width: 90px;
        height: 5px;
        background-color: black;
        margin: 0px auto;
      }
  `}
  &:hover {
    background-color: #fff;
  }
`;

const ShopPagination = styled.div`
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
`;

const Shop = ({
  films,
  filmActive,
  pages1280,
  pages1250,
  pages820,
  pages600,
  pages470,
}) => {
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
  // стэйтт видимости сайдбара категории
  const [viewCateg, setViewCateg] = useState(true);

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

  //возвращаем сайдбар категории при увеличении ширины экрана
  useEffect(() => {
    if (pages600) {
      setViewCateg(true);
    }
  }, [pages600]);

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

  const sideTab = () => {
    setViewCateg(!viewCateg);
  };

  // массив ссылок и его перебор для навигации
  const arrNav = ["All", "Year", "Country", "Price"];
  const nav = arrNav.map((item, index) => {
    return (
      <Li
        onClick={(e) => {
          item === "All"
            ? changeFilms(e.currentTarget)
            : changeArrow(e.currentTarget);
        }}
        id={item}
        key={index}
        active={stateShop === item ? true : false}
      >
        {item} {item === "All" ? all(item) : arrow(classI, item)}
      </Li>
    );
  });

  return (
    <StyledShop
      pages1280={pages1280}
      pages820={pages820}
      pages600={pages600}
      none={shopNone}
    >
      <ShopBar>
        <ShopNav pages600={pages600}>
          {!pages600 ? (
            <h4 onClick={() => sideTab()} className="h4Cursor">
              Catagories{" "}
              <i
                className={viewCateg ? "fas fa-arrow-down" : "fas fa-arrow-up"}
              ></i>
            </h4>
          ) : (
            <h4>Catagories</h4>
          )}
          <ul className={!viewCateg ? "shop__null" : null}>{nav}</ul>
        </ShopNav>
      </ShopBar>
      <ShopHeader>
        <ShopForm pages1280={pages1280} pages820={pages820} pages600={pages600}>
          <form>
            <input
              className="shop__search_title"
              type="text"
              placeholder="film"
              onChange={(e) => searchTitle(e.target.value)}
              value={shopValueTitle}
            />
          </form>

          <form>
            <input
              className="shop__search_autor"
              type="text"
              placeholder="author"
              onChange={(e) => searchAuthor(e.target.value)}
              value={shopValueAuthor}
            />
          </form>
        </ShopForm>
      </ShopHeader>
      {shopNone && (
        <ShopNone>
          <p>None</p>
          <button onClick={() => searchReturn()}>return</button>
        </ShopNone>
      )}
      {arrShop && stateShop === "All" && !shopNone && (
        <ShopContent
          pages1250={pages1250}
          pages820={pages820}
          pages600={pages600}
          pages470={pages470}
        >
          {chunk(arrShop, 12)[shopPage].map((film) => (
            <div
              key={film.id}
              className="shop__content_item"
              onClick={() => filmActive(film)}
            >
              {pages470 ? (
                <div className="shop__content_author">{film.author}</div>
              ) : null}
              {pages470 ? <h3>{film.title}</h3> : null}
              <Link to="/film">
                <img src={film.image} alt={film.title} />
              </Link>
              <div className="shop__content_price">{film.price} $</div>
            </div>
          ))}
        </ShopContent>
      )}
      {arrShop && stateShop === "Year" && !shopNone && (
        <ShopContent
          pages1250={pages1250}
          pages820={pages820}
          pages600={pages600}
          pages470={pages470}
        >
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
        </ShopContent>
      )}
      {arrShop && stateShop === "Country" && !shopNone && (
        <ShopContent
          pages1250={pages1250}
          pages820={pages820}
          pages600={pages600}
          pages470={pages470}
        >
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
        </ShopContent>
      )}
      {arrShop && stateShop === "Price" && !shopNone && (
        <ShopContent
          pages1250={pages1250}
          pages820={pages820}
          pages600={pages600}
          pages470={pages470}
        >
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
        </ShopContent>
      )}
      <ShopPagination>
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
      </ShopPagination>
    </StyledShop>
  );
};

const mapStateToProps = ({
  filmData: { films },
  filmResponsive: { pages1280, pages1250, pages820, pages600, pages470 },
}) => {
  return { films, pages1280, pages1250, pages820, pages600, pages470 };
};

const mapDispatchToProps = {
  filmActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
