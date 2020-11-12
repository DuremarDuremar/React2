import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { filmBuy } from "../reducers/action";
import { getAxiosFrames, getAxiosDescription } from "../server";
import Spinner from "../components/spinner";
import "./film.scss";

const Film = ({ film, films, filmBuy }) => {
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

  console.log(quantity);

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
  };

  if (!filmAct) {
    return <Spinner />;
  }

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

const mapStateToProps = ({ filmData: { film, films } }) => {
  return { film, films };
};

const mapDispatchToProps = {
  filmBuy,
};

export default connect(mapStateToProps, mapDispatchToProps)(Film);
