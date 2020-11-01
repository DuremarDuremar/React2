import React from "react";
import { connect } from "react-redux";
import "./film.scss";

const Film = ({ film }) => {
  console.log("film", film);
  return (
    <div className="film">
      <div className="film__poster">1</div>
      <div className="film__info">2</div>
      <div className="film__images">3</div>
    </div>
  );
};

const mapStateToProps = ({ filmData: { film } }) => {
  return { film };
};

export default connect(mapStateToProps)(Film);
