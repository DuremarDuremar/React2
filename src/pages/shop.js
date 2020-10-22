import React from "react";
import "./shop.scss";

const Shop = () => {
  return (
    <div className="shop">
      <div className="shop__sidebar">
        <div className="shop__nav">
          <h4>Catagories</h4>
          <ul>
            <li>Year</li>
            <li>Country</li>
            <li>Price</li>
          </ul>
        </div>
      </div>
      <div className="shop__header">
        <div className="shop__form">
          <form>
            <input
              className="shop__search_title"
              type="text"
              placeholder="film"
            />
            <button>go</button>
          </form>

          <form>
            <input
              className="shop__search_autor"
              type="text"
              placeholder="autor"
            />
            <button>go</button>
          </form>
        </div>
      </div>
      <div className="shop__content"></div>
    </div>
  );
};

export default Shop;
