import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { filmActive } from "../reducers/action";
import { chunk } from "lodash";
import shuffle from "../utils/shuffle";
import styled from "styled-components";

const StyleHome = styled.div``;

const HomeContainer = styled.div`
  display: grid;
  background-color: #636e72;
  grid-template-columns: ${(props) =>
    props.pages1000
      ? "repeat(3, 1fr)"
      : props.pages600
      ? "repeat(2, 1fr)"
      : "1fr"};
`;

const HomeItem = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 1;
  border: 4px solid #6d214f;
  transition: all ease-out 0.95s;

  img {
    width: 100%;
    height: 100%;
    display: block;
    transition: all ease-out 0.95s;
  }
  .home__item_info {
    transition: all ease-out 0.95s;
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 100%;
    background-color: #636e72;
    opacity: 0;
    visibility: hidden;
    text-align: center;
    padding: 10px 0;
  }
  .home__item_price {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    width: 50px;
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
    padding: 10px;
    text-align: center;
    background-color: #636e72;
  }

  &:hover img {
    opacity: 0.4;
  }

  &:hover .home__item_info {
    opacity: 1;
    visibility: visible;
  }
`;

const HomeMore = styled.div`
  cursor: pointer;
  text-align: center;
  margin: 0px auto;
  width: 50%;
  height: 30px;
  margin-bottom: 20px;
  border-bottom-right-radius: 40%;
  border-bottom-left-radius: 40%;
  font-size: 20px;
  background-color: #636e72;
  color: #fff;
  transition: all ease-out 0.35s;
  &:hover {
    border: 4px solid black;
    color: black;
    font-weight: 800;
  }
`;

const Home = ({ films, filmActive, pages1000, pages600 }) => {
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
      <StyleHome>
        <HomeContainer pages1000={pages1000} pages600={pages600}>
          {filmsHome[0].map((film) => (
            <HomeItem key={film.id} onClick={() => filmActive(film)}>
              <Link to="/film">
                <img src={film.image} alt={film.title} />
              </Link>
              <div className="home__item_info">
                <h3>{film.title}</h3>
                <span>
                  <h6>{film.year}</h6>
                  <h5>{film.country}</h5>
                  <h4>{film.author}</h4>
                </span>
              </div>
              <div className="home__item_price">{film.price}$</div>
            </HomeItem>
          ))}
        </HomeContainer>
        <HomeMore onClick={() => setFilmVieW(filmsView + 3)}>more</HomeMore>
      </StyleHome>
    );
  } else {
    return <p>loading</p>;
  }
};

const mapStateToProps = ({
  filmData: { films },
  filmResponsive: { pages1000, pages600 },
}) => {
  return { films, pages1000, pages600 };
};

const mapDispatchToProps = {
  filmActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
