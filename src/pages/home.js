import React from "react";
import { connect } from "react-redux";
import { filmLoaded } from "../reducers/action";
import shuffle from "../utils/shuffle";
import "./home.scss";

const Home = ({ films }) => {
  if (films) {
    shuffle(films);

    return (
      <div className="home">
        <div className="home__container">
          {films.map((film, index) => (
            <div
              key={film.id}
              className={index !== 0 ? "home__item" : "home__item home__item_0"}
            >
              <img src={film.image} alt={film.title} />
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
