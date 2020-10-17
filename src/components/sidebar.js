import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { filmLoaded } from "../reducers/action";
import "./sidebar.scss";

const Sidebar = ({ films, filmLoaded }) => {
  console.log(films);

  return (
    <div className="sidebar">
      <div className="sidebar__title">Cinema__Classic__Shop</div>
      <div className="sidebar__nav">
        <ul>
          <NavLink className="sidebar__li" to="/" exact>
            <li>Home</li>
          </NavLink>
          <NavLink className="sidebar__li" to="/shop">
            <li>Shop</li>
          </NavLink>
          <NavLink className="sidebar__li" to="/film">
            <li>Film</li>
          </NavLink>
          <NavLink className="sidebar__li" to="/checkout">
            <li>Checkout</li>
          </NavLink>
        </ul>
      </div>
      <div className="sidebar__search">
        <p onClick={() => filmLoaded()}>
          <i className="fas fa-search"></i> Search
        </p>
      </div>
      <div className="sidebar__cart">
        <NavLink className="sidebar__p" to="/cart">
          <p>
            <i className="fas fa-shopping-cart"></i> Cart
          </p>
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

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

const mapDispatchToProps = {
  filmLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
