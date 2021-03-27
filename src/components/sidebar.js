import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { getAxiosLogin } from "../server";
import { connect } from "react-redux";
import { logLogin, logSubmit, logName } from "../reducers/action";
import useLocalStorage from "../utils/localStorage";
import styled from "styled-components";

const StyleSidebar = styled.div`
  grid-area: s;
  background-color: #636e72;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 10px;
  border-right: 4px solid #6d214f;

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
        logName
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
  ]);

  // if (!a700) {
  //   return (
  //     <StyleSidebarAdap>
  //       <div className="sidebar__wrapper">
  //         <i
  //           className="fas fa-exchange-alt fa-3x view"
  //           onClick={() => setView(!view)}
  //         ></i>

  //         <div className="sidebar__title">
  //           <p>
  //             Cinema <br />
  //             Classic
  //             <br />
  //             Shop
  //           </p>
  //         </div>
  //         <div className="sidebar__nav">
  //           <ul>
  //             {!login ? (
  //               <NavLink className="sidebar__li" to="/log">
  //                 <i className="fas fa-key fa-2x"></i>
  //               </NavLink>
  //             ) : (
  //               <li className="sidebar__name">
  //                 Hello, {name}
  //                 <Link to="/">
  //                   <i
  //                     className="fas fa-sign-out-alt"
  //                     title="exit"
  //                     onClick={() => {
  //                       logLogin(false);
  //                       setToken("");
  //                       setPassword("");
  //                       setEmail("");
  //                     }}
  //                   ></i>
  //                 </Link>
  //               </li>
  //             )}
  //             <NavLink className="sidebar__li" to="/" exact>
  //               <i className="fas fa-home fa-2x"></i>
  //             </NavLink>
  //             <NavLink className="sidebar__li" to="/shop">
  //               <i className="fas fa-layer-group fa-2x"></i>
  //             </NavLink>
  //             <NavLink className="sidebar__li" to="/film">
  //               <i className="fas fa-film fa-2x"></i>
  //             </NavLink>
  //           </ul>
  //         </div>
  //         <div className="sidebar__cart">
  //           <NavLink className="sidebar__p" to="/cart">
  //             <i className="fas fa-shopping-cart fa-2x"></i>

  //             <p> ${total}</p>
  //           </NavLink>
  //         </div>
  //       </div>
  //     </StyleSidebarAdap>
  //   );
  // }

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

  return (
    <StyleSidebar>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
