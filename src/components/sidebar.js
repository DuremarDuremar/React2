import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logLogin } from "../reducers/action";
import "./sidebar.scss";

const Sidebar = ({ total, login, logLogin }) => {
  console.log("sidebar", login);

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
            <li className="sidebar__name">Hello, Ivan</li>
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

const mapStateToProps = ({ filmCart: { total }, filmLog: { login } }) => {
  return { total, login };
};

const mapDispatchToProps = {
  logLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
