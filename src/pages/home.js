import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { chunk } from "lodash";
import { filmLoaded } from "../reducers/action";
import shuffle from "../utils/shuffle";
import "./home.scss";

const Home = ({ films }) => {
  const [filmsView, setFilmVieW] = useState(6);
  const [homeFilms, setHomeFilms] = useState(null);

  useEffect(() => {
    if (films) {
      shuffle(films);
      setHomeFilms(films);
    }
  }, [films]);

  if (homeFilms) {
    const filmsHome = chunk(homeFilms, filmsView);

    return (
      <div className="home">
        <div className="home__container">
          {filmsHome[0].map((film) => (
            <div key={film.id} className="home__item">
              <img src={film.image} alt={film.title} />
              <div className="home__item_info">
                <h3>{film.title}</h3>
                <span>
                  <h6>{film.year}</h6>
                  <h5>{film.country}</h5>
                  <h4>{film.author}</h4>
                </span>
              </div>
              <div className="home__item_price">{film.price}$</div>
            </div>
          ))}
        </div>
        <div
          className="home__item_more"
          onClick={() => setFilmVieW(filmsView + 3)}
        >
          more
        </div>
      </div>
    );
  } else {
    return <p>loading</p>;
  }
};

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

const mapDispatchToProps = {
  filmLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
