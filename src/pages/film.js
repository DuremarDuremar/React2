import React from "react";
import { connect } from "react-redux";
import "./film.scss";

const Film = ({ film }) => {
  window.scrollTo(0, 0);

  if (!film) {
    return <p>loading</p>;
  }

  return (
    <div className="film">
      <div className="film__poster">
        <img src={film.image} alt={film.title} />
      </div>
      <div className="film__info">
        <div className="film__info_price">$ {film.price}</div>
        <div className="film__info_title">{film.title}</div>
        <div className="film__info_subtitle">
          <div className="film__info_country">
            {film.country}
            <p />
            {film.year}
          </div>
          <div className="film__info_author">{film.author}</div>
        </div>
        <div className="film__info_text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          fugiat quo recusandae?Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Non esse ex ipsam fuga earum facilis voluptatem, vel
          maxime quam quaerat iure, impedit labore qui a voluptates similique
          quidem corporis est?Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Dolore odit voluptas expedita animi dicta culpa,
          repudiandae dignissimos ullam fugiat, excepturi molestiae fuga impedit
          amet labore, soluta adipisci sed. Doloribus, obcaecati.
        </div>
        <form action="" className="film__info_form">
          <input type="number" min="1" max="10" placeholder="1" />
          <div className="film__info_arrow">
            <div>
              <i className="fas fa-sort-up"></i>
            </div>
            <div>
              <i className="fas fa-sort-down"></i>
            </div>
          </div>
          <button
            className="film__cart"
            onClick={(event) => event.preventDefault()}
          >
            Add to cart
          </button>
        </form>
        <div className="film__slider">
          <i className="fas fa-play fa-4x play-reverce film__play"></i>
          <i className="fas fa-circle fa-4x"></i>
          <i className="fas fa-play fa-4x film__play"></i>
        </div>
      </div>
      <div className="film__images">3</div>
    </div>
  );
};

const mapStateToProps = ({ filmData: { film } }) => {
  return { film };
};

export default connect(mapStateToProps)(Film);
