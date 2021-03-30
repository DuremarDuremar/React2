import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAxiosFrames } from "../server";
import { shuffle } from "lodash";
import { logName, logSubmit, logUrl, logEnter } from "../reducers/action";
import useLocalStorage from "../utils/localStorage";
import getRandomInt from "../utils/getRandom";
import { useForm } from "react-hook-form";
import Spinner from "../components/spinner";
import styled from "styled-components";

const StyledReg = styled.div`
  display: grid;
  grid-template-rows: minmax(100px, auto) minmax(170px, auto);
  min-height: 100%;
`;

const RegForm = styled.form`
  display: ${(props) => (props.pages820 ? "flex" : "block")};
  background-color: burlywood;
  .reg__input {
    border-right: ${(props) => props.pages820 && "3px solid black"};
    flex: 0 1 70%;
    input {
      max-width: ${(props) => !props.pages820 && "calc(110px + 20vw)"};
      display: block;
      margin: 0px auto;
      margin-top: 20px;
      padding: 10px 10px 10px 5px;
      border-radius: 9px;
      border: 1px solid black;
      font-size: ${(props) => !props.pages820 && "18px"};
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
      font-size: ${(props) => !props.pages820 && "20px"};
      position: relative;
      &:hover {
        &::after {
          content: "";
          display: block;
          width: 80px;
          height: 3px;
          background-color: #6d214f;
          margin: 0 auto;
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
  .reg__submit {
    flex: 0 1 30%;
    padding-bottom: ${(props) => !props.pages820 && "20px"};
    h2 {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: ${(props) => !props.pages820 && "25px"};
    }
    button {
      margin: 0px auto;
      background-color: #fff;
      width: 100px;
      height: 60px;
      font-weight: 700;
      border-radius: 20px;
      display: block;
      transition: all ease-out 0.35s;

      &:hover {
        background-color: #fbb710;
      }
    }
  }
`;

const RegImage = styled.div`
  display: grid;
  border-bottom: 3px solid #6d214f;
  min-height: 70vh;
  .reg__img_wrapper {
    display: grid;
    padding: 20px 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

    img {
      background-color: black;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 30px;
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
  logEnter,
  pages820,
  pages1250,
}) => {
  const [regFrames0, setRegFrames0] = useState(null);
  const [regFrames1, setRegFrames1] = useState(null);
  const [regFrames2, setRegFrames2] = useState(null);
  const [email, setEmail] = useLocalStorage("email");
  const [password, setPassword] = useLocalStorage("password");
  const { register, handleSubmit, errors } = useForm();

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
  const onSubmit = (e) => {
    logEnter(email, password);
    logSubmit(true);
  };

  // если зарегистрированы, переходим на главную страницу
  if (login) {
    return <Redirect to="/" />;
  }

  return (
    <StyledReg style={{ height: "100%" }}>
      <RegForm onSubmit={handleSubmit(onSubmit)} pages820={pages820}>
        <div className="reg__input">
          {!loginTrue && (
            <input
              type="text"
              placeholder="Name"
              className="reg__name"
              value={name}
              ref={register}
              onChange={(e) => logName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="reg__email"
            ref={register}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="reg__password"
            ref={register}
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
      </RegForm>
      <RegImage>
        {regFrames2 && regFrames1 && regFrames0 ? (
          <div className="reg__img_wrapper">
            <img src={regFrames0.image} alt="1" />
            {pages820 && <img src={regFrames1.image} alt="2" />}
            {pages1250 && <img src={regFrames2.image} alt="3" />}
          </div>
        ) : (
          <Spinner />
        )}
      </RegImage>
    </StyledReg>
  );
};

const mapStateToProps = ({
  filmData: { films },
  filmLog: { login, name, submit },
  filmResponsive: { pages1250, pages820 },
}) => {
  return {
    films,
    login,
    name,
    submit,
    pages820,
    pages1250,
  };
};

const mapDispatchToProps = {
  logName,
  logSubmit,
  logUrl,
  logEnter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
