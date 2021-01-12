import React from "react";
import styled from "styled-components";

const StyleFooter = styled.div`
  .footer__link {
    display: flex;
    background-color: #6d214f;
    justify-content: space-around;
    padding-top: 10px;

    button {
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
    <div className="footer">
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
    </div>
  );
};

export default Footer;
