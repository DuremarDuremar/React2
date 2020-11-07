import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { uniqBy } from "lodash";
import { filmBuy } from "../reducers/action";
import "./cart.scss";

const Cart = ({ buy }) => {
  const [newBuy, setNewBuy] = useState(null);

  // делаем логику изменения значения кол-во и общей суммы в прайсе
  useEffect(() => {
    if (buy.length !== 0) {
      const buyMap = buy.map((item) => {
        let buyFilter = buy.filter((film) => film.id === item.id);
        return {
          ...item,
          price: item.price * buyFilter.length,
          quantity: buyFilter.length,
        };
      });
      // превращаем массив в коллекцию
      setNewBuy(uniqBy(buyMap, "id"));
    }
  }, [buy]);

  // общая сумма
  const totalCart = () => {
    if (newBuy) {
      return newBuy.reduce(
        function (total, item) {
          return Number(total + item.price);
        },
        [0]
      );
    } else {
      return 0;
    }
  };

  console.log("buy", buy);
  console.log("newBuy", newBuy);

  return (
    <div className="cart">
      <div className="cart__shopping">
        <h3>Shopping Cart</h3>

        <ul className="cart__nav cart__item">
          <li>Film</li>
          <li>Price</li>
          <li>Quantity</li>
        </ul>

        {newBuy && (
          <div className="cart__content">
            {newBuy.map((film) => (
              <ul className="cart__item" key={film.id}>
                <li className="cart__film">{film.title}</li>
                <li>${film.price}</li>
                <li>{film.quantity}</li>
              </ul>
            ))}
          </div>
        )}
      </div>
      <div className="cart__total">
        <h4>Cart Total</h4>
        <div className="cart__quantity cart__info">
          Quantity: <span> {buy.length} </span>{" "}
          <i>{buy.length !== 1 ? "films" : "film"}</i>
        </div>
        <div className="cart__sum cart__info">
          Total: <span> ${totalCart()}</span>
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
