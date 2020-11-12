import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { uniqBy } from "lodash";
import { filmBuy, filmActive } from "../reducers/action";
import "./cart.scss";

const Cart = ({ buy, films, filmActive }) => {
  const [newBuy, setNewBuy] = useState(null);

  // делаем логику изменения значения кол-во и общей суммы в прайсе
  useEffect(() => {
    if (buy.length !== 0) {
      const buyMap = buy.map((item) => {
        let buyFilter = buy.filter((film) => film.id === item.id);
        let buyReduce = buyFilter.reduce(
          function (total, item) {
            return Number(total + item.quantity);
          },
          [0]
        );
        // console.log("buyFilter", buyReduce);
        return {
          ...item,
          price: item.price * buyReduce,
          quantity: buyReduce,
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

  // общее кол-во фильмов
  const totalAll = () => {
    if (newBuy) {
      return newBuy.reduce(
        function (total, item) {
          return Number(total + item.quantity);
        },
        [0]
      );
    } else {
      return 0;
    }
  };

  // ссылка на страницу с фильмом
  const returnLinkFilm = (id) => {
    let filmLink = films.filter((film) => film.id === id);
    filmActive(...filmLink);
  };

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
              <ul
                className="cart__item"
                key={film.id}
                onClick={() => returnLinkFilm(film.id)}
              >
                <li className="cart__film">
                  <Link to="/film">
                    <p>{film.title}</p>
                  </Link>
                </li>
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
          Quantity: <span> {totalAll()} </span>{" "}
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

const mapStateToProps = ({ filmCart: { buy }, filmData: { films } }) => {
  return { buy, films };
};

const mapDispatchToProps = {
  filmBuy,
  filmActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
