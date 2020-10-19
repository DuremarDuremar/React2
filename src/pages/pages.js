import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { filmLoaded } from "../reducers/action";
import Server from "../server";
import Home from "./home";
import Film from "./film";
import Shop from "./shop";
import Checkout from "./checkout";
import Cart from "./cart";
import "./pages.scss";

const dataServer = new Server();

const Pages = ({ films, filmLoaded }) => {
  useEffect(() => {
    dataServer.getServer().then((data) => {
      filmLoaded(data);
    });
  }, []);

  console.log("pages", films);

  return (
    <div className="pages">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/film" component={Film} exact />
        <Route path="/shop" component={Shop} exact />
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/cart" component={Cart} exact />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ filmData: { films } }) => {
  return { films };
};

const mapDispatchToProps = {
  filmLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
