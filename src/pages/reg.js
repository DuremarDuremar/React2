import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAxiosFrames } from "../server";
import { shuffle } from "lodash";
import { logName, logSubmit, logUrl } from "../reducers/action";
import useLocalStorage from "../utils/localStorage";
import getRandomInt from "../utils/getRandom";
import Spinner from "../components/spinner";
import styled from "styled-components";

const StylesReg = styled.div`
  .reg {
    display: grid;
    grid-template-rows: minmax(220px, auto) minmax(300px, auto);
    min-height: 100%;
    form {
      display: flex;
      background-color: burlywood;
      .reg__input {
        border-right: 3px solid black;
        flex: 0 1 70%;
        input {
          display: block;
          margin: 0px auto;
          margin-top: 20px;
          padding: 10px 10px 10px 5px;
          border-radius: 9px;
          border: 1px solid black;
          &:last-child {
            margin-bottom: 30px;
          }
        }
        h4 {
          text-align: center;
          margin-top: 10px;
          font-style: italic;
          margin-bottom: 5px;
          cursor: pointer;
          color: black;
          &:hover {
            &::after {
              content: "";
              display: block;
              width: 80px;
              height: 2px;
              background-color: #6d214f;
              margin: 0px auto;
            }
          }
        }
      }
      .reg__submit {
        flex: 0 1 30%;
        h2 {
          text-align: center;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        button {
          margin: 0px auto;
          background-color: #fff;
          width: 100px;
          height: 60px;
          font-weight: 700;
          border-radius: 20px;
          display: block;

          &:hover {
            background-color: #fbb710;
          }
        }
      }
    }
    .reg__img {
      display: grid;

      .reg__img_wrapper {
        display: grid;
        padding: 20px 0;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        height: 100%;
        img {
          background-color: black;
          width: 100%;
          height: 100%;
          object-fit: fill;
          border-radius: 30px;
        }
      }
    }
  }
`;

const Reg = ({
  films,
  match,
  login,
  name,
  logName,
  logSubmit,
  submit,
  logUrl,
}) => {
  const [regFrames0, setRegFrames0] = useState(null);
  const [regFrames1, setRegFrames1] = useState(null);
  const [regFrames2, setRegFrames2] = useState(null);
  const [, setEmail] = useLocalStorage("email");
  const [, setPassword] = useLocalStorage("password");

  // мешаем разные кадры
  const int = () => {
    return getRandomInt(0, 8);
  };

  // проверяем какая страница
  const loginTrue = match.path === "/log";

  useEffect(() => {
    if (!loginTrue) {
      logUrl("users");
    } else {
      logUrl("users/login");
    }
  }, [loginTrue, logUrl]);

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
    // e.preventDefault();
    logSubmit(true);

    console.log("enter");
  };

  // если зарегистрированы, переходим на главную страницу
  if (login) {
    return <Redirect to="/" />;
  }

  return (
    <StylesReg style={{ height: "100%" }}>
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

            <input
              type="email"
              placeholder="Email"
              className="reg__email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="reg__password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to={loginTrue ? "log/reg" : "/log"}>
              <h4>{loginTrue ? "Need an account?" : "Have an account?"}</h4>
            </Link>
          </div>
          <div className="reg__submit">
            <h2>{loginTrue ? "Sign in" : "Sign up"}</h2>

            <button type="submit" disabled={submit}>
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
    </StylesReg>
  );
};

const mapStateToProps = ({
  filmData: { films },
  filmLog: { login, name, email, password, submit },
}) => {
  return { films, login, name, email, password, submit };
};

const mapDispatchToProps = {
  logName,
  logSubmit,
  logUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
