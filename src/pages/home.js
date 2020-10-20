import React from "react";
import { connect } from "react-redux";
import { filmLoaded } from "../reducers/action";
import shuffle from "../utils/shuffle";
import "./home.scss";

const Home = ({ films }) => {
  if (films) {
    shuffle(films);
    const filmsHome = films.filter((item, index) => index < 6);

    return (
      <div className="home">
        <div className="home__container">
          {filmsHome.map((film) => (
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
