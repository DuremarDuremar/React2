import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const ShopContent = () => {
  return (
    <div className="pages">
      <Switch>
        {/* <Route path="/" component={Home} films={films} exact />
            <Route path="/film" component={Film} exact />
            <Route path="/shop" component={Shop} exact />
            <Route path="/checkout" component={Checkout} exact />
            <Route path="/cart" component={Cart} exact /> */}
        <Redirect to="/shop" />
      </Switch>
    </div>
  );
};

export default ShopContent;
