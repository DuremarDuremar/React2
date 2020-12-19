import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

const StyleFooter = styled.div`
  .footer__null {
    background-color: #6d214f;
  }
`;

const Footer = () => {
  const f700 = useMediaQuery({ query: "(min-width: 700px)" });

  if (!f700) {
    return (
      <StyleFooter>
        <p className="footer__null"></p>
      </StyleFooter>
    );
  } else {
    return (
      <div className="footer">
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
      </div>
    );
  }
};

export default Footer;
