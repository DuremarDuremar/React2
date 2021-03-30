import React from "react";
import styled from "styled-components";

const StyleFooter = styled.div`
  grid-area: f;
  width: 100%;
  height: 100%;
  background-color: #6d214f;
  padding-bottom: 4px;
  .footer__link {
    display: flex;
    background-color: #6d214f;
    justify-content: space-around;
    padding-top: 10px;

    button {
      transition: all ease-out 0.55s;
      width: 30px;
      height: 30px;
      padding: 2px !important;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:hover {
        background-color: #6d214f;
        color: #fff;
      }
    }
  }
  .footer__null {
    background-color: #6d214f;
  }
`;

const Footer = () => {
  return (
    <StyleFooter>
      <div className="footer__link">
        <button>
          <i className="fab fa-instagram-square fa-2x"></i>
        </button>
        <button>
          <i className="fab fa-facebook-f fa-2x"></i>
        </button>
        <button>
          <i className="fab fa-twitter fa-2x"></i>
        </button>
      </div>
    </StyleFooter>
  );
};

export default Footer;
