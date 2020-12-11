import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  filmLoaded,
  filmActive,
  res1200,
  res1250,
  res1000,
  res820,
  res600,
} from "../reducers/action";
import getRandomInt from "../utils/getRandom";
import Server from "../server";
import Home from "./home";
import Film from "./film";
import Shop from "./shop";
import Reg from "./reg";
import Cart from "./cart";
import { useMediaQuery } from "react-responsive";

const dataServer = new Server();

const Pages = ({
  films,
  filmLoaded,
  filmActive,
  film,
  res1200,
  res1250,
  res1000,
  res820,
  res600,
}) => {
  const p1250 = useMediaQuery({ query: "(min-width: 1250px)" });
  const p1200 = useMediaQuery({ query: "(min-width: 1200px)" });
  const p1000 = useMediaQuery({ query: "(min-width: 1000px)" });
  const p820 = useMediaQuery({ query: "(min-width: 820px)" });
  const p600 = useMediaQuery({ query: "(min-width: 600px)" });

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

  useEffect(() => {
    res1200(p1200);
  }, [p1200, res1200]);

  useEffect(() => {
    res1250(p1250);
  }, [p1250, res1250]);

  useEffect(() => {
    res820(p820);
  }, [p820, res820]);

  useEffect(() => {
    res600(p600);
  }, [p600, res600]);

  useEffect(() => {
    res1000(p1000);
  }, [p1000, res1000]);

  return (
    <div className="pages">
      <Switch>
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
  res1200,
  res1000,
  res1250,
  res820,
  res600,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
