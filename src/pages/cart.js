import React from "react";
import { connect } from "react-redux";
import { filmBuy } from "../reducers/action";
import "./cart.scss";

const Cart = ({ buy }) => {
  console.log(buy);
  return (
    <div className="cart">
      <div className="cart__shopping">
        <h3>Shopping Cart</h3>

        <ul className="cart__nav cart__item">
          <li>Film</li>
          <li>Price</li>
          <li>Quantity</li>
        </ul>

        {buy && (
          <div className="cart__content">
            {buy.map((film) => (
              <ul className="cart__item" key={film.id}>
                <li className="cart__film">{film.title}</li>
                <li>${film.price}</li>
                <li>1</li>
              </ul>
            ))}
          </div>
        )}
      </div>
      <div className="cart__total">
        <h4>Cart Total</h4>
        <div className="cart__quantity cart__info">
          Quantity: <span> 22 </span> <i>films</i>
        </div>
        <div className="cart__sum cart__info">
          Total: <span> $278</span>
        </div>
        <button className="film__cart">Checkcout</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ filmCart: { buy } }) => {
  return { buy };
};

const mapDispatchToProps = {
  filmBuy,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
