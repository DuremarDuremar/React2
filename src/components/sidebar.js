import React from "react";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__title">Cinema__Classic__Shop</div>
      <div className="sidebar__nav">
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Film</li>
          <li>Checkout</li>
        </ul>
      </div>
      <div className="sidebar__search">
        <i class="fas fa-search"></i> Search
      </div>
      <div className="sidebar__cart">
        <i class="fas fa-shopping-cart"></i> Cart
      </div>
      <div className="sidebar__link">
        <a href="#">
          <i className="fab fa-instagram-square"></i>
        </a>
        <a href="#">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
