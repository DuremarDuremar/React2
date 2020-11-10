import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { filmBuy } from "../reducers/action";
import { getFrames, getAxiosFrames } from "../server";
import Spinner from "../components/spinner";
import "./film.scss";

const Film = ({ film, films, filmBuy }) => {
  window.scrollTo(0, 0);

  const [filmAct, setFilmAct] = useState(null);
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    if (film) {
      setFilmAct(film);
    }
  }, [film]);

  useEffect(() => {
    if (filmAct) {
      // getFrames(filmAct.frames).then((response) => setFrames(response));
      getAxiosFrames(filmAct.frames).then((response) => setFrames(response));
    }
  }, [filmAct]);

  // функция перелистывания вперед
  const nextFilm = () => {
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
    filmBuy({ ...filmAct, quantity: 1 });
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          fugiat quo recusandae?Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Non esse ex ipsam fuga earum facilis voluptatem, vel
          maxime quam quaerat iure, impedit labore qui a voluptates similique
          quidem corporis est?Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Dolore odit voluptas expedita animi dicta culpa,
          repudiandae dignissimos ullam fugiat, excepturi molestiae fuga impedit
          amet labore, soluta adipisci sed. Doloribus, obcaecati.
        </div>
        <form action="" className="film__info_form">
          <input type="number" min="1" max="10" placeholder="1" />
          <div className="film__info_arrow">
            <div>
              <i className="fas fa-sort-up"></i>
            </div>
            <div>
              <i className="fas fa-sort-down"></i>
            </div>
          </div>
          <button
            className="film__cart"
            onClick={(event) => {
              quantityFilm(event);
            }}
          >
            Add to cart
          </button>
        </form>
        <div className="film__slider">
          <i
            className="fas fa-play fa-4x play-reverce film__play"
            onClick={() => prevFilm()}
          ></i>
          <i className="fas fa-circle fa-4x"></i>
          <i
            className="fas fa-play fa-4x film__play"
            onClick={() => nextFilm()}
          ></i>
        </div>
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
