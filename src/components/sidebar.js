import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { getAxiosLogin } from "../server";
import { connect } from "react-redux";
import { logLogin, logSubmit, logName } from "../reducers/action";
import useLocalStorage from "../utils/localStorage";
import styled from "styled-components";

const StyleSidebar = styled.div`
  .sidebar {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 10px;
    border-right: 4px solid #6d214f;

    .sidebar__title {
      font-family: "Sansita Swashed", cursive;
      font-weight: 700;
      font-size: 25px;
      margin-bottom: 30px;
    }
    .sidebar__nav {
      font-family: "Sansita Swashed", cursive;
      font-weight: 700;
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 30px;

      ul {
        .sidebar__li {
          display: block;
          &:not(:first-child) {
            margin-top: 20px;
          }
          li {
            color: black;
            cursor: pointer;

            &:hover {
              color: #6d214f;
            }
          }
        }
        .sidebar__name {
          text-align: center;
          font-size: 20px;
          font-style: normal;
          border: 3px solid #6d214f;
          border-radius: 30px;
          background-color: #fff;
          i {
            margin-left: 6px;
            cursor: pointer;
            color: black;
          }
        }
      }
    }
    .sidebar__search {
      font-weight: 600;
      margin-bottom: 20px;
      p {
        cursor: pointer;
        display: inline-block;
      }
    }
    .sidebar__cart {
      font-weight: 600;
      margin-bottom: 30px;
      p {
        color: black;
        cursor: pointer;
        display: inline-block;
        &:hover {
          color: #6d214f;
        }
      }
      span {
        color: #fbb710;
      }
    }
    .sidebar__link {
      display: flex;
      button {
        width: 30px;
        height: 30px;
        padding: 2px;
        &:not(:last-child) {
          margin-right: 10px;
        }
        &:hover {
          background-color: #6d214f;
          color: #fff;
        }
      }
    }
    .sidebar__li.active {
      li {
        color: #6d214f !important;
        &:before {
          content: "";
          display: inline-block;
          background-color: #6d214f;
          width: 40px;
          height: 9px;
          margin-right: 5px;
        }
      }
    }

    .sidebar__p.active {
      p {
        color: #6d214f !important;
        &:after {
          content: "";
          display: block;
          background-color: #6d214f;
          width: 60px;
          height: 9px;
          margin-right: 5px;
        }
      }
    }
  }
`;

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

  return (
    <StyleSidebar>
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
    </StyleSidebar>
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
