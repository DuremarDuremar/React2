import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAxiosFrames } from "../server";
import { shuffle } from "lodash";
import { logLogin, logName } from "../reducers/action";
import getRandomInt from "../utils/getRandom";
import Spinner from "../components/spinner";
import "./reg.scss";

const Reg = ({ films, logLogin, match, login, name, logName }) => {
  const [regFrames0, setRegFrames0] = useState(null);
  const [regFrames1, setRegFrames1] = useState(null);
  const [regFrames2, setRegFrames2] = useState(null);

  // мешаем разные кадры
  const int = () => {
    return getRandomInt(0, 8);
  };

  // проверяем какая страница
  const loginTrue = match.path === "/log";

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

  // заходим на сайт или регистрируемся, прверяем есть ли у нас ник
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 1) {
      logLogin(true);
    } else {
      alert("user not found");
    }
  };

  // если зарегистрированы, переходим на главную страницу
  if (login) {
    return <Redirect to="/" />;
  }

  return (
    <div className="reg">
      <form onSubmit={handleSubmit}>
        <div className="reg__input">
          {!loginTrue && (
            <input
              type="text"
              placeholder="Name"
              className="reg__name"
              value={name}
              onChange={(e) => logName(e.target.value)}
            />
          )}

          <input type="email" placeholder="Email" className="reg__email" />
          <input
            type="password"
            placeholder="Password"
            className="reg__password"
          />
          <Link to={loginTrue ? "log/reg" : "/log"}>
            <h4>{loginTrue ? "Need an account?" : "Have an account?"}</h4>
          </Link>
        </div>
        <div className="reg__submit">
          <h2>{loginTrue ? "Sign in" : "Sign up"}</h2>

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

const mapStateToProps = ({ filmData: { films }, filmLog: { login, name } }) => {
  return { films, login, name };
};

const mapDispatchToProps = {
  logLogin,
  logName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
