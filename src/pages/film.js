import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { filmBuy, filmTotal } from "../reducers/action";
import { getAxiosFrames, getAxiosDescription } from "../server";
import Spinner from "../components/spinner";
import styled from "styled-components";

const StyledFilm = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  min-height: 100vh;
  ${(props) =>
    props.pages1000 &&
    `
    grid-template-areas:
    "p in"
    "im im";
  `}
  ${(props) =>
    !props.pages1000 &&
    props.pages600 &&
    `
    grid-template-areas:
      "p in"
      "t t"
      "im im";
  `}
   ${(props) =>
    !props.pages600 &&
    `
    grid-template-areas:
      "w w"
      "t t"
      "im im";
  `}
`;

const FilmPoster = styled.div`
  grid-area: p;
  margin-right: 3vmax;
  display: ${(props) => !props.pages1000 && "flex"};
  img {
    min-width: ${(props) => props.pages1000 && "180px"};
    display: block;
    max-width: 100%;
    max-height: calc(40vmax + 250px);
    min-height: ${(props) => props.pages1000 && "300px"};
    border: 4px solid #6d214f;
    border-left: none;
  }
`;

const FilmInfo = styled.div`
  font-family: "Sansita Swashed", cursive;
  grid-area: in;
  margin-right: ${(props) => !props.pages1000 && props.pages600 && "10px"};
  ${(props) =>
    !props.pages600 &&
    `
    border-radius: 40px;
    position: absolute;
    bottom: -30px;
    left: 0;
    background-color: #636e72;

  `}
  .film__info_price {
    font-size: ${(props) =>
      props.pages1000 ? "calc(2vmax + 5px)" : "calc(2vmax + 7px)"};
    color: #fbb710;
    ${(props) =>
      props.pages600 &&
      `
    padding-top: 15px;
    &:before {
      content: "";
      display: block;
      background-color: #fbb710;
      width: 70px;
      height: 5px;
    }
  `}
    text-align: ${(props) => !props.pages600 && "center"};
  }
  .film__info_title {
    font-size: calc(2vmax + 12px);
  }
  .film__info_subtitle {
    display: ${(props) => (props.pages1000 ? "flex" : "block")};
    justify-content: space-around;
    .film__info_country {
      font-size: ${(props) =>
        props.pages1000 ? "calc(0.8vmax + 6px)" : "calc(0.8vmax + 10px)"};
      margin-top: ${(props) => !props.pages1000 && "10px"};
      font-weight: 700;
      font-family: "Ubuntu";
    }
    .film__info_author {
      margin-top: ${(props) => !props.pages1000 && "10px"};
      font-size: calc(2vmax + 5px);
      font-weight: 400;
    }
  }
  .film__info_text {
    margin-right: 10px;
    margin-top: 5vmax;
    padding: 5px;
    font-size: calc(0.8vmax + 8px);
    font-weight: 400;
    min-height: 280px;
  }
  .film__info_form {
    ${(props) =>
      props.pages1000 &&
      `
    margin: 50px 0;
    display: flex;
    justify-content: space-around;
  `}
    ${(props) =>
      !props.pages1000 &&
      `
    display: block;
  `}

    .film__input {
      display: flex;
      padding-top: 5px;
      ${(props) =>
        !props.pages1000 &&
        `
      margin-top: 15px;
      justify-content: center;
      margin-left: 15px;
  `}
      input {
        width: 50px;
        height: ${(props) => (props.pages600 ? "40px" : "60px")};
        ${(props) =>
          !props.pages600 &&
          `
        border: 3px solid black;
        font-size: 17px;
  `}
        appearance: textfield;
        color: #959595;
        overflow: visible;
        text-align: center;
      }
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .film__info_arrow {
        display: ${(props) => (props.pages600 ? "block" : "flex")};
        flex-direction: column;
        justify-content: space-between;
        i {
          cursor: pointer;
          width: 20px;
          padding-left: 3px;
        }
      }
    }

    .film__slider {
      text-align: center;
      display: flex;
      ${(props) =>
        !props.pages1000 &&
        `
        padding-top: 25px;
        justify-content: center;
        align-items: center;
  `}

      button {
        min-width: 50px;
      }

      .play-reverce {
        transform: rotate(180deg);
      }
      .film__play {
        cursor: pointer;
        &:hover {
          color: #fbb710;
        }
      }
      .film__cart {
        background-color: #fff;
        max-width: 100px;
        max-height: ${(props) => (props.pages1000 ? "60px" : "80px")};
        font-weight: 700;
        border-radius: 20px;
        display: block;
        margin: 0 5px;
        ${(props) =>
          !props.pages1000 &&
          `
        min-height: 50px;
        font-size: 15px;
        padding: 3px;
  `}
        &:hover {
          background-color: #fbb710;
        }
      }
    }
  }
`;

const FilmWrapper = styled.div`
  grid-area: w;
  position: relative;
  margin: 0px auto;
  min-height: 450px;
`;

const FilmText = styled.div`
  grid-area: t;
  margin-right: 10px;
  margin-top: ${(props) => (props.pages600 ? "5vmax" : "7vmax")};
  margin-bottom: 2vmax;
  padding: 5px;
  font-size: calc(0.8vmax + 10px);
  font-weight: 400;
  p {
    margin-top: ${(props) => !props.pages600 && "8px"};
  }
  .film__info_title {
    font-size: calc(2vmax + 12px);
  }
  .film__info_subtitle {
    display: ${(props) => (props.pages1000 ? "flex" : "block")};
    justify-content: space-around;
    .film__info_country {
      font-size: ${(props) =>
        props.pages1000 ? "calc(0.8vmax + 6px)" : "calc(0.8vmax + 10px)"};
      margin-top: ${(props) => !props.pages1000 && "10px"};
      font-weight: 700;
      font-family: "Ubuntu";
    }
    .film__info_author {
      margin-top: ${(props) => !props.pages1000 && "10px"};
      font-size: calc(2vmax + 5px);
      font-weight: 400;
    }
  }
`;

const FilmImages = styled.div`
  overflow: hidden;
  display: grid;
  grid-area: im;
  grid-template-columns: ${(props) =>
    props.pages600
      ? "repeat(auto-fit, minmax(300px, 1fr))"
      : "repeat(auto-fit, minmax(200px, 1fr))"};
  padding: 1vw;

  .film__frame {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Film = ({
  film,
  films,
  total,
  filmBuy,
  filmTotal,
  pages1000,
  pages600,
}) => {
  window.scrollTo(0, 0);

  const [filmAct, setFilmAct] = useState(null);
  const [frames, setFrames] = useState([]);
  const [description, setDescription] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (film) {
      setFilmAct(film);
    }
  }, [film]);

  useEffect(() => {
    if (filmAct) {
      getAxiosDescription(filmAct.filmId).then((response) =>
        setDescription(response)
      );
      getAxiosFrames(filmAct.filmId).then((response) => setFrames(response));
    }
  }, [filmAct]);

  // функция перелистывания вперед
  const nextFilm = () => {
    setQuantity(1);
    const newFilm = films.filter((item) => {
      if (filmAct.id === films.length) {
        return item.id === 1;
      }
      return item.id === filmAct.id + 1;
    });
    setFilmAct(...newFilm);
  };

  // функция перелистывания назад
  const prevFilm = () => {
    setQuantity(1);
    const newFilm = films.filter((item) => {
      if (filmAct.id === 1) {
        return item.id === films.length;
      }
      return item.id === filmAct.id - 1;
    });
    setFilmAct(...newFilm);
  };

  // функция добавления кол-во и отправка в корзину
  const quantityFilm = (event) => {
    event.preventDefault();
    console.log("quantity", quantity);
    filmBuy({ ...filmAct, quantity: quantity });
    filmTotal(total + quantity * filmAct.price);
  };

  if (!filmAct) {
    return <Spinner />;
  }

  const posterInfo = (
    <>
      <FilmPoster pages1000={pages1000} pages600={pages600}>
        <img src={filmAct.image} alt={filmAct.title} />
      </FilmPoster>
      <FilmInfo pages1000={pages1000} pages600={pages600}>
        <div className="film__info_price">$ {filmAct.price}</div>
        {pages600 && <div className="film__info_title">{filmAct.title}</div>}
        {pages600 && (
          <div className="film__info_subtitle">
            <div className="film__info_country">
              {filmAct.country}
              <p />
              {filmAct.year}
            </div>
            <div className="film__info_author">{filmAct.author}</div>
          </div>
        )}
        {pages1000 && (
          <div className="film__info_text">
            {!description ? <Spinner /> : <p>{description}</p>}
          </div>
        )}
        <form action="" className="film__info_form">
          <div className="film__input">
            <input
              type="number"
              min="1"
              max="10"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
            <div className="film__info_arrow">
              <div>
                <i
                  className={`fas fa-sort-up + ${!pages600 && "fa-lg"}`}
                  onClick={() => {
                    quantity > 9 ? setQuantity(10) : setQuantity(quantity + 1);
                  }}
                ></i>
              </div>
              <div>
                <i
                  className={`fas fa-sort-down + ${!pages600 && "fa-lg"}`}
                  onClick={() => {
                    quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1);
                  }}
                ></i>
              </div>
            </div>
          </div>

          <div className="film__slider">
            <i
              className="fas fa-play fa-4x play-reverce film__play"
              onClick={() => prevFilm()}
            ></i>
            <button
              className="film__cart"
              onClick={(event) => {
                quantityFilm(event);
              }}
            >
              {pages600 ? "Add to cart" : "Add"}
            </button>
            <i
              className="fas fa-play fa-4x film__play"
              onClick={() => nextFilm()}
            ></i>
          </div>
        </form>
      </FilmInfo>
    </>
  );

  return (
    <StyledFilm pages1000={pages1000} pages600={pages600}>
      {pages600 ? posterInfo : <FilmWrapper>{posterInfo}</FilmWrapper>}
      {!pages1000 && (
        <FilmText pages1000={pages1000} pages600={pages600}>
          {!pages600 && (
            <>
              <div className="film__info_title">{filmAct.title}</div>
              <div className="film__info_subtitle">
                <div className="film__info_author">{filmAct.author}</div>
                <div className="film__info_country">
                  {filmAct.country}
                  <p />
                  {filmAct.year}
                </div>
              </div>
            </>
          )}
          {!description ? <Spinner /> : <p>{description}</p>}
        </FilmText>
      )}

      <FilmImages pages1000={pages1000} pages600={pages600}>
        {!frames ? (
          <Spinner />
        ) : (
          frames.map((film, index) => (
            <div className="film__frame" key={index}>
              <img src={film.image} alt="film" />
            </div>
          ))
        )}
      </FilmImages>
    </StyledFilm>
  );
};

const mapStateToProps = ({
  filmData: { film, films },
  filmCart: { total },
  filmResponsive: { pages1000, pages600 },
}) => {
  return { film, films, total, pages1000, pages600 };
};

const mapDispatchToProps = {
  filmBuy,
  filmTotal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Film);
