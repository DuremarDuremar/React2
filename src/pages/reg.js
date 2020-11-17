import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAxiosFrames } from "../server";
import { shuffle } from "lodash";
import getRandomInt from "../utils/getRandom";
import Spinner from "../components/spinner";
import "./reg.scss";

const Reg = ({ films }) => {
  const [regFrames0, setRegFrames0] = useState(null);
  const [regFrames1, setRegFrames1] = useState(null);
  const [regFrames2, setRegFrames2] = useState(null);

  const int = () => {
    return getRandomInt(0, 8);
  };
  useEffect(() => {
    if (films) {
      const frames = shuffle(films).map((film) => film.filmId);
      getAxiosFrames(frames[0]).then((response) =>
        setRegFrames0(response[int()])
      );
      getAxiosFrames(frames[1]).then((response) =>
        setRegFrames1(response[int()])
      );
      getAxiosFrames(frames[2]).then((response) =>
        setRegFrames2(response[int()])
      );
    }
  }, [films]);
  console.log("regFrames0", regFrames0);
  console.log("regFrames1", regFrames1);
  console.log("regFrames2", regFrames2);

  return (
    <div className="reg">
      <form>
        <div className="reg__input">
          <input type="text" placeholder="Name" className="reg__name" />
          <input type="email" placeholder="Email" className="reg__email" />
          <input
            type="password"
            placeholder="Password"
            className="reg__password"
          />
        </div>
        <div className="reg__submit">
          <h2>Login Up</h2>
          <button type="submit">
            <i className="fas fa-door-open fa-2x"></i>
          </button>
        </div>
      </form>
      <div className="reg__img">
        {regFrames2 && regFrames1 && regFrames0 ? (
          <div className="reg__img_wrapper">
            <img src={regFrames0.image} alt="1" />
            <img src={regFrames1.image} alt="2" />
            <img src={regFrames2.image} alt="3" />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
