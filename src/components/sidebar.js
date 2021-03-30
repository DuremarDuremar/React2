import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { getAxiosLogin } from "../server";
import { connect } from "react-redux";
import { logLogin, logSubmit, logName, logError } from "../reducers/action";
import useLocalStorage from "../utils/localStorage";
import styled from "styled-components";

const StyleSidebar = styled.div`
  grid-area: s;
  background-color: #636e72;
  padding-top: 30px;
  padding-left: ${(props) => (props.a700 ? "30px" : "10px")};
  padding-right: 10px;
  border-right: 4px solid #6d214f;
  min-width: 45px;
`;

const SidebsrWrapper = styled.div`
  position: fixed;
  z-index: 4;
  .sidebar__li.active {
    i {
      color: #6d214f !important;
    }
  }

  .sidebar__p.active {
    i {
      color: #6d214f !important;
    }
  }
  ///////////////////////////
  .view {
    cursor: pointer;
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
`;

const SidebarTitle = styled.div`
  font-family: "Sansita Swashed", cursive;
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 30px;
  font-size: ${(props) => (props.a700 ? "25px" : "15px")};
  margin-top: ${(props) => !props.a700 && "15px"};
`;

const SidebarNav = styled.div`
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
      i {
        color: black;
        cursor: pointer;

        &:hover {
          color: #6d214f;
        }
      }
    }
  }
`;

const SidebarName = styled.div`
  text-align: center;
  font-size: 20px;
  font-style: normal;
  border: 3px solid #6d214f;
  border-radius: 30px;
  background-color: #fff;
  padding: 3px 7px;
  font-size: 18px;
  max-width: 120px;
  ${(props) =>
    !props.a700 &&
    `

    transition: width ease-out 0.95s;
    cursor: pointer;
    width: 35px;
     :hover{
       width: 140px;
     }
    :hover p{
      white-space: normal;
      visibility: visible;
      position: static;
      
      
  }
  `}

  p {
    ${(props) =>
      !props.a700 &&
      `
    white-space: nowrap;
    visibility: hidden;
    position: absolute;
  
  `}
  }
  i {
    margin-left: 6px;
    cursor: pointer;
    color: black;
  }
`;

const SidebarCart = styled.div`
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
  div {
    margin-top: 5px;
    color: #fbb710;
  }
  span {
    color: #fbb710;
  }
  i {
    color: black;
    cursor: pointer;
    display: inline-block;
    &:hover {
      color: #6d214f;
    }
  }
`;

const SidebarLink = styled.div`
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
`;

const Sidebar = ({
  total,
  login,
  logLogin,
  logError,
  name,
  submit,
  logSubmit,
  url,
  logName,
  view,
  setView,
  emailLog,
  passwordLog,
  a700,
  pages1200,
}) => {
  const [, setToken] = useLocalStorage("token");
  const [email, setEmail] = useLocalStorage("email");
  const [password, setPassword] = useLocalStorage("password");

  const emaliEnter = emailLog.length > 1 ? emailLog : email;
  const passwordEnter = passwordLog.length > 1 ? passwordLog : password;

  //делаем запрос отправляя данные для входа либо регистрации
  useEffect(() => {
    if (submit) {
      getAxiosLogin(
        emaliEnter,
        passwordEnter,
        logSubmit,
        url,
        name,
        logLogin,
        setToken,
        logName,
        logError
      );
    } else {
      return;
    }
  }, [
    emaliEnter,
    passwordEnter,
    submit,
    logSubmit,
    url,
    name,
    logLogin,
    setToken,
    logName,
    logError,
  ]);

  const title = (
    <>
      {pages1200 ? (
        "Cinema__Classic__Shop"
      ) : a700 ? (
        <span>
          _Cinema
          <br />
          __Classic
          <br />
          ___Shop
        </span>
      ) : (
        <p>
          Cinema <br />
          Classic
          <br />
          Shop
        </p>
      )}
    </>
  );

  const nameBar = (name) => {
    return (
      <SidebarName as="li" a700={a700} name={name}>
        <p>Hello, {name}</p>

        <Link to="/">
          <i
            className={
              a700 ? "fas fa-sign-out-alt" : "fas fa-sign-out-alt fa-2x"
            }
            title="exit"
            onClick={() => {
              logLogin(false);
              setToken("");
              setPassword("");
              setEmail("");
            }}
          ></i>
        </Link>
      </SidebarName>
    );
  };

  return (
    <StyleSidebar a700={a700}>
      <SidebsrWrapper>
        {!a700 && (
          <i
            className="fas fa-exchange-alt fa-3x view"
            onClick={() => setView(!view)}
          ></i>
        )}
        <SidebarTitle a700={a700}>{title}</SidebarTitle>

        <SidebarNav>
          <ul>
            {!login ? (
              <NavLink className="sidebar__li" to="/log">
                {a700 ? <li>Sign In</li> : <i className="fas fa-key fa-2x"></i>}
              </NavLink>
            ) : (
              nameBar(name)
            )}
            <NavLink className="sidebar__li" to="/" exact>
              {a700 ? <li>Home</li> : <i className="fas fa-home fa-2x"></i>}
            </NavLink>
            <NavLink className="sidebar__li" to="/shop">
              {a700 ? (
                <li>Shop </li>
              ) : (
                <i className="fas fa-layer-group fa-2x"></i>
              )}
            </NavLink>
            <NavLink className="sidebar__li" to="/film">
              {a700 ? <li>Film</li> : <i className="fas fa-film fa-2x"></i>}
            </NavLink>
          </ul>
        </SidebarNav>

        <SidebarCart a700={a700}>
          <NavLink className="sidebar__p" to="/cart">
            {a700 ? (
              <>
                <p>
                  <i className="fas fa-shopping-cart"></i> Cart
                </p>
                <span> ${total}</span>
              </>
            ) : (
              <>
                <i className="fas fa-shopping-cart fa-2x"></i>{" "}
                <div> ${total}</div>{" "}
              </>
            )}
          </NavLink>
        </SidebarCart>
        {a700 && (
          <SidebarLink>
            <button>
              <i className="fab fa-instagram-square fa-2x"></i>
            </button>
            <button>
              <i className="fab fa-facebook-f fa-2x"></i>
            </button>
            <button>
              <i className="fab fa-twitter fa-2x"></i>
            </button>
          </SidebarLink>
        )}
      </SidebsrWrapper>
    </StyleSidebar>
  );
};

const mapStateToProps = ({
  filmCart: { total },
  filmLog: { login, name, submit, url, emailLog, passwordLog },
  filmResponsive: { pages1200 },
}) => {
  return {
    total,
    login,
    name,
    submit,
    url,
    emailLog,
    passwordLog,
    pages1200,
  };
};

const mapDispatchToProps = {
  logLogin,
  logSubmit,
  logName,
  logError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
