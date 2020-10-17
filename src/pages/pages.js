import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import Film from "./film";
import Shop from "./shop";
import Checkout from "./checkout";
import Cart from "./cart";
import "./pages.scss";

const Pages = () => {
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

export default Pages;
