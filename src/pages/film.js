import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { filmBuy, filmTotal } from "../reducers/action";
import { getAxiosFrames, getAxiosDescription } from "../server";
import Spinner from "../components/spinner";
import styled from "styled-components";

const StyledFilm = styled.div`
  .film {
    display: grid;
    grid-template-areas:
      "p in"
      "im im";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    min-height: 100vh;

    .film__poster {
      grid-area: p;
      margin-right: 3vmax;
      img {
        display: block;
        max-width: 100%;
        min-width: 180px;
        max-height: calc(40vmax + 50px);
        min-height: 300px;
        border: 4px solid #6d214f;
        border-left: none;
      }
    }
    .film__info {
      font-family: "Sansita Swashed", cursive;
      grid-area: in;
      .film__info_price {
        padding-top: 15px;
        font-size: calc(2vmax + 5px);
        color: #fbb710;
        &:before {
          content: "";
          display: block;
          background-color: #fbb710;
          width: 70px;
          height: 5px;
        }
      }
      .film__info_title {
        font-size: calc(2vmax + 12px);
      }
      .film__info_subtitle {
        display: flex;
        justify-content: space-around;
        .film__info_country {
          font-size: calc(0.8vmax + 6px);
          font-weight: 700;
          font-family: "Ubuntu";
        }
        .film__info_author {
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
    }
    .film__images {
      display: grid;
      grid-area: im;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      padding: 20px;

      .film__frame {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .film__info_form {
      margin: 50px 0;
      display: flex;

      justify-content: space-around;

      .film__input {
        display: flex;
        padding-top: 5px;
        input {
          width: 50px;
          height: 40px;
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
          display: block;
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
          max-height: 60px;
          font-weight: 700;
          border-radius: 20px;
          display: block;
          margin: 0 5px;
          &:hover {
            background-color: #fbb710;
          }
        }
      }
    }
  }
`;

const StyledFilm1000 = styled.div`
  .film {
    display: grid;
    grid-template-areas:
      "p in"
      "f f"
      "im im";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    min-height: 100vh;
    background-color: red;

    .film__poster {
      grid-area: p;
      margin-right: 3vmax;
      display: flex;
      img {
        display: block;
        max-width: 100%;
        min-width: 240px;
        max-height: calc(40vmax + 50px);
        min-height: 390px;
        border: 4px solid #6d214f;
        border-left: none;
      }
    }

    .film__info {
      font-family: "Sansita Swashed", cursive;
      grid-area: in;
      margin-right: 10px;
      .film__info_price {
        padding-top: 15px;
        font-size: calc(2vmax + 7px);
        color: #fbb710;
      }
      .film__info_title {
        font-size: calc(2vmax + 12px);
      }
      .film__info_subtitle {
        display: block;

        .film__info_country {
          font-size: calc(0.8vmax + 6px);
          font-weight: 700;
          font-family: "Ubuntu";
        }
        .film__info_author {
          font-size: calc(2vmax + 5px);
          font-weight: 400;
        }
      }
    }

    .film__images {
      display: grid;
      grid-area: im;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      padding: 20px;

      .film__frame {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .film__form {
      display: block;
      grid-area: f;
      justify-content: space-around;

      .film__input {
        margin-top: 5px;
        display: flex;
        padding-top: 5px;
        justify-content: center;
        input {
          width: 50px;
          height: 40px;
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
          display: block;
          i {
            cursor: pointer;
            width: 20px;
            padding-left: 3px;
          }
        }
      }
      .film__info_text {
        margin-right: 10px;
        margin-top: 5vmax;
        margin-bottom: 5vmax;
        padding: 5px;
        font-size: calc(0.8vmax + 8px);
        font-weight: 400;
      }
      .film__slider {
        text-align: center;
        display: flex;
        justify-content: center;
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
          max-height: 60px;
          font-weight: 700;
          border-radius: 20px;
          display: block;
          margin: 0 5px;
          &:hover {
            background-color: #fbb710;
          }
        }
      }
    }
  }
`;

const Film = ({ film, films, total, filmBuy, filmTotal, pages1000 }) => {
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

  const filmRender = () => {
    return (
      <div className="film">
        <div className="film__poster">
          <img src={filmAct.image} alt={filmAct.title} />
        </div>
        <div className="film__info">
          <div className="film__info_price">$ {filmAct.price}</div>
          <div className="film__info_title">{filmAct.title}</div>
          <div className="film__info_subtitle">
            <div className="film__info_country">
              {filmAct.country}
              <p />
              {filmAct.year}
            </div>
            <div className="film__info_author">{filmAct.author}</div>
          </div>
          <div className="film__info_text">
            {!description ? <Spinner /> : <p>{description}</p>}
          </div>
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
                    className="fas fa-sort-up"
                    onClick={() => {
                      quantity > 9
                        ? setQuantity(10)
                        : setQuantity(quantity + 1);
                    }}
                  ></i>
                </div>
                <div>
                  <i
                    className="fas fa-sort-down"
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
                Add to cart
              </button>
              <i
                className="fas fa-play fa-4x film__play"
                onClick={() => nextFilm()}
              ></i>
            </div>
          </form>
        </div>

        <div className="film__images">
          {!frames ? (
            <Spinner />
          ) : (
            frames.map((film, index) => (
              <div className="film__frame" key={index}>
                <img src={film.image} alt="film" />
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  const filmRender1000 = () => {
    return (
      <div className="film">
        <div className="film__poster">
          <img src={filmAct.image} alt={filmAct.title} />
        </div>

        <div className="film__info">
          <div className="film__info_price">$ {filmAct.price}</div>
          <div className="film__info_title">{filmAct.title}</div>
          <div className="film__info_subtitle">
            <div className="film__info_country">
              {filmAct.country}
              <p />
              {filmAct.year}
            </div>
            <div className="film__info_author">{filmAct.author}</div>
          </div>
        </div>
        <form action="" className="film__form">
          <div className="film__info_text">
            {!description ? <Spinner /> : <p>{description}</p>}
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
              Add to cart
            </button>
            <i
              className="fas fa-play fa-4x film__play"
              onClick={() => nextFilm()}
            ></i>
          </div>
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
                  className="fas fa-sort-up"
                  onClick={() => {
                    quantity > 9 ? setQuantity(10) : setQuantity(quantity + 1);
                  }}
                ></i>
              </div>
              <div>
                <i
                  className="fas fa-sort-down"
                  onClick={() => {
                    quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1);
                  }}
                ></i>
              </div>
            </div>
          </div>
        </form>

        <div className="film__images">
          {!frames ? (
            <Spinner />
          ) : (
            frames.map((film, index) => (
              <div className="film__frame" key={index}>
                <img src={film.image} alt="film" />
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  if (pages1000) {
    return <StyledFilm>{filmRender()}</StyledFilm>;
  } else {
    return <StyledFilm1000>{filmRender1000()}</StyledFilm1000>;
  }
};

const mapStateToProps = ({
  filmData: { film, films },
  filmCart: { total },
  filmResponsive: { pages1000 },
}) => {
  return { film, films, total, pages1000 };
};

const mapDispatchToProps = {
  filmBuy,
  filmTotal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Film);
