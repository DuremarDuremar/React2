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
      </div>
      <div className="cart__total">2</div>
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
