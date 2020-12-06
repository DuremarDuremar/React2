import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { uniqBy } from "lodash";
import { filmBuy, filmActive, filmTotal } from "../reducers/action";
import styled from "styled-components";

const StylesCart = styled.div`
  .cart {
    display: flex;
    background-color: #fff;
    min-height: 100%;
    .cart__shopping {
      background-color: #fff;
      flex: 0 1 65%;
      padding: 20px;
      h3 {
        text-align: center;
      }
      .cart__nav {
        background-color: #636e72;
        font-weight: 700;
        font-family: "Sansita Swashed", cursive;

        li {
          cursor: pointer;

          &:hover {
            background-color: #fff;
            border-radius: 10px;
          }
        }
      }
      .cart__item {
        margin-top: 10px;
        display: flex;
        padding: 5px 0;
        color: black;
        font-weight: 700;
        font-family: "Sansita Swashed", cursive;

        li {
          flex: 0 0 25%;
          text-align: center;
        }
        .cart__film {
          p {
            color: black;
            &:hover {
              outline: 6px solid black;
            }
          }
        }
        .cart__delete {
          margin: 0 3px;
          color: red;
          &:hover {
            border: 1px solid black;
            border-radius: 100%;
          }
        }
        i {
          cursor: pointer;
        }
      }
    }

    .cart__total {
      background-color: darkgoldenrod;
      flex: 0 1 35%;
      padding: 20px;
      background-color: #636e72;
      color: #fff;
      border-left: 4px solid #6d214f;

      h4 {
        text-align: center;
      }
      .cart__info {
        padding-top: 20px;
        text-align: center;
        font-size: 18px;
        span {
          font-size: 30px;
          font-family: "Sansita Swashed", cursive;
        }
      }
      button {
        background-color: #fbb710;
        width: 100px;
        height: 60px;
        border-radius: 20px;
        display: block;
        margin: 20px auto 0;
        font-style: italic;
        font-weight: 900;
      }
    }
  }
`;

const Cart = ({ buy, total, films, filmTotal, filmActive }) => {
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
  useEffect(() => {
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
    filmTotal(totalCart());
  }, [newBuy, filmTotal]);

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

  // удаление фильма из корзины
  const deleteFilmAll = (id) => {
    const deleteAll = newBuy.filter((item) => item.id !== id);
    setNewBuy(deleteAll);
  };

  //уменьшение кол-во копий одного фильма в корзине
  const deleteFilmCart = (id) => {
    const deleteFilm = newBuy.map(function (item) {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          price:
            item.quantity > 1
              ? (item.price / item.quantity) * (item.quantity - 1)
              : item.price,
        };
      } else {
        return item;
      }
    });
    setNewBuy(deleteFilm);
  };

  //увелечение кол-во копий одного фильма в корзине
  const addFilmCart = (id) => {
    const addFilm = newBuy.map(function (item) {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity < 10 ? item.quantity + 1 : 10,
          price:
            item.quantity < 10
              ? (item.price / item.quantity) * (item.quantity + 1)
              : item.price,
        };
      } else {
        return item;
      }
    });
    setNewBuy(addFilm);
  };

  return (
    <StylesCart style={{ height: "100%" }}>
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
                  <li>
                    <i
                      className="fas fa-angle-left"
                      onClick={() => deleteFilmCart(film.id)}
                    ></i>
                    <i
                      className="fas fa-minus-circle cart__delete"
                      onClick={() => deleteFilmAll(film.id)}
                    ></i>
                    <i
                      className="fas fa-angle-right"
                      onClick={() => addFilmCart(film.id)}
                    ></i>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
        <div className="cart__total">
          <h4>Cart Total</h4>
          <div className="cart__quantity cart__info">
            Quantity: <span> {totalAll()} </span>
            <i>{buy.length !== 1 ? "films" : "film"}</i>
          </div>
          <div className="cart__sum cart__info">
            Total: <span> ${total}</span>
          </div>
          <button className="film__cart">Checkcout</button>
        </div>
      </div>
    </StylesCart>
  );
};

const mapStateToProps = ({ filmCart: { buy, total }, filmData: { films } }) => {
  return { buy, total, films };
};

const mapDispatchToProps = {
  filmBuy,
  filmTotal,
  filmActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
