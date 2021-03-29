import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { animateScroll as scroll } from "react-scroll";

const StyledMore = styled.div`
  cursor: pointer;
  text-align: center;
  margin: 0px auto;
  width: 50%;
  height: 30px;
  margin-bottom: 20px;
  border-bottom-right-radius: 40%;
  border-bottom-left-radius: 40%;
  font-size: 20px;
  background-color: #636e72;
  color: #fff;
  transition: all ease-out 0.35s;
  position: ${(props) => (props.film ? "absolute" : "static")};
  bottom: -15px;
  left: 50%;
  transform: ${(props) => props.film && "translateX(-50%)"};
  display: ${(props) => props.film && props.image > 10 && "none"};
  display: ${(props) =>
    props.homeFilms && props.image > props.homeFilms.length && "none"};

  &:hover {
    border: 4px solid black;
    color: black;
    font-weight: 800;
  }
`;

const More = (props) => {
  const num = props.film ? (props.pages1280 ? 3 : 2) : props.pages1000 ? 3 : 2;

  return (
    <StyledMore
      {...props}
      onClick={() => {
        props.setImage(
          props.film
            ? props.image > 11
              ? 12
              : props.image + num
            : props.image + num
        );
        scroll.scrollToBottom();
      }}
    >
      More
    </StyledMore>
  );
};

const mapStateToProps = ({ filmResponsive: { pages1000, pages1280 } }) => {
  return { pages1000, pages1280 };
};

export default connect(mapStateToProps)(More);
