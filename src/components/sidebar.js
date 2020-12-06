import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { getAxiosLogin } from "../server";
import { connect } from "react-redux";
import { logLogin, logSubmit, logName } from "../reducers/action";
import useLocalStorage from "../utils/localStorage";
import "./sidebar.scss";

const Sidebar = ({
  total,
  login,
  logLogin,
  name,
  submit,
  logSubmit,
  url,
  logName,
}) => {
  const [, setToken] = useLocalStorage("token");
  const [email, setEmail] = useLocalStorage("email");
  const [password, setPassword] = useLocalStorage("password");

  // console.log("email", email);

  //делаем запрос отправляя данные для входа либо регистрации
  useEffect(() => {
    if (submit) {
      getAxiosLogin(
        email,
        password,
        logSubmit,
        url,
        name,
        logLogin,
        setToken,
        logName
      );
    } else {
      return;
    }
  }, [
    email,
    password,
    submit,
    logSubmit,
    url,
    name,
    logLogin,
    setToken,
    logName,
  ]);

  // console.log("token", token);

  return (
    <div className="sidebar">
      <div className="sidebar__title">Cinema__Classic__Shop</div>
      <div className="sidebar__nav">
        <ul>
          {!login ? (
            <NavLink className="sidebar__li" to="/log">
              <li>Sign In</li>
            </NavLink>
          ) : (
            <li className="sidebar__name">
              Hello, {name}
              <Link to="/">
                <i
                  className="fas fa-sign-out-alt"
                  title="exit"
                  onClick={() => {
                    logLogin(false);
                    setToken("");
                    setPassword("");
                    setEmail("");
                  }}
                ></i>
              </Link>
            </li>
          )}
          <NavLink className="sidebar__li" to="/" exact>
            <li>Home</li>
          </NavLink>
          <NavLink className="sidebar__li" to="/shop">
            <li>Shop</li>
          </NavLink>
          <NavLink className="sidebar__li" to="/film">
            <li>Film</li>
          </NavLink>
        </ul>
      </div>
      <div className="sidebar__search">
        <p>
          <i className="fas fa-search"></i> Search
        </p>
      </div>
      <div className="sidebar__cart">
        <NavLink className="sidebar__p" to="/cart">
          <p>
            <i className="fas fa-shopping-cart"></i> Cart
          </p>
          <span> ${total}</span>
        </NavLink>
      </div>
      <div className="sidebar__link">
        <button>
          <i className="fab fa-instagram-square fa-2x"></i>
        </button>
        <button>
          <i className="fab fa-facebook-f fa-2x"></i>
        </button>
        <button>
          <i className="fab fa-twitter fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  filmCart: { total },
  filmLog: { login, name, submit, url },
}) => {
  return { total, login, name, submit, url };
};

const mapDispatchToProps = {
  logLogin,
  logSubmit,
  logName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
