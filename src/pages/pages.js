import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { filmLoaded, filmActive } from "../reducers/action";
import getRandomInt from "../utils/getRandom";
import Server from "../server";
import Home from "./home";
import Film from "./film";
import Shop from "./shop";
import Reg from "./reg";
import Checkout from "./checkout";
import Cart from "./cart";
import "./pages.scss";

const dataServer = new Server();

const Pages = ({ films, filmLoaded, filmActive, film }) => {
  //получаем масиис фильмов
  useEffect(() => {
    dataServer.getServer().then((data) => {
      filmLoaded(data);
    });
  }, [filmLoaded]);
  // вычлиняем из полученного массива один фильм
  useEffect(() => {
    if (films) {
      let number = getRandomInt(0, films.length - 1);
      filmActive(films[number]);
    }
  }, [films, filmActive]);

  return (
    <div className="pages">
      <Switch>
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/" component={Home} exact />
        <Route path="/film" component={Film} />
        <Route path="/shop" component={Shop} />
        <Route path="/log/reg" component={Reg} />
        <Route path="/log" component={Reg} />
        <Route path="/cart" component={Cart} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ filmData: { films, film } }) => {
  return { films, film };
};

const mapDispatchToProps = {
  filmLoaded,
  filmActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
