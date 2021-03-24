import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { uniqBy } from "lodash";
import { filmBuy, filmActive, filmTotal } from "../reducers/action";
import styled from "styled-components";

const StylesCart = styled.div`
  background-color: #fff;
  min-height: 100vh;
  display: ${(props) => (props.pages820 ? "flex" : "block")};
`;

const CartShopping = styled.div`
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
`;

const CartItem = styled.ul`
  margin-top: 10px;
  display: flex;
  padding: 5px 0;
  color: black;
  font-weight: 700;
  font-family: "Sansita Swashed", cursive;
  flex-wrap: ${(props) => (props.pages470 ? "nowrap" : "wrap")};

  li {
    flex: ${(props) => (props.pages470 ? "0 0 25%" : "0 0 50%")};
    text-align: center;
    :first-child {
      width: ${(props) => (props.pages470 ? "100%" : "calc(60px + 5vw)")};
    }
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
`;

const CartTotal = styled.div`
  /* background-color: darkgoldenrod; */
  flex: 0 1 35%;
  padding: 20px;
  min-height: 80vh;
  background-color: #636e72;
  color: #fff;
  border-left: ${(props) => (props.pages820 ? "4px solid #6d214f" : "none")};

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
`;

const Cart = ({
  buy,
  total,
  films,
  filmTotal,
  filmActive,
  pages820,
  pages470,
}) => {
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

  const itemCart = (film) => {
    return (
      <CartItem
        key={film.id}
        onClick={() => returnLinkFilm(film.id)}
        pages470={pages470}
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
      </CartItem>
    );
  };

  return (
    <StylesCart pages820={pages820}>
      <CartShopping>
        <h3>Shopping Cart</h3>

        <CartItem className="cart__nav">
          <li>Film</li>
          <li>Price</li>
          <li>Quantity</li>
        </CartItem>

        {newBuy && (
          <div className="cart__content">
            {newBuy.map((film) => itemCart(film))}
          </div>
        )}
      </CartShopping>
      <CartTotal pages820={pages820}>
        <h4>Cart Total</h4>
        <div className="cart__quantity cart__info">
          Quantity: <span> {totalAll()} </span>
          <i>{buy.length !== 1 ? "films" : "film"}</i>
        </div>
        <div className="cart__sum cart__info">
          Total: <span> ${total}</span>
        </div>
        <button className="film__cart">Checkcout</button>
      </CartTotal>
    </StylesCart>
  );

  // if (pages820) {
  //   return <StylesCart style={{ height: "100%" }}>{cartRender}</StylesCart>;
  // } else {
  //   return (
  //     <StylesCart820 style={{ height: "100%" }}>{cartRender}</StylesCart820>
  //   );
  // }
};

const mapStateToProps = ({
  filmCart: { buy, total },
  filmData: { films },
  filmResponsive: { pages820, pages470 },
}) => {
  return { buy, total, films, pages820, pages470 };
};

const mapDispatchToProps = {
  filmBuy,
  filmTotal,
  filmActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
