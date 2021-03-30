import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./reducers/createStore";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Pages from "./pages/pages";
import styled, { createGlobalStyle } from "styled-components";
import { useMediaQuery } from "react-responsive";

const Global = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  border: 0;
  user-select: none;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

a {
  text-decoration: none;
}

ul li {
  list-style: none;
}

button {
  outline: none;
  cursor: pointer;
}
input{
  outline: none;
}

`;

const All = styled.div`
  .footer {
    grid-area: f;
    width: 100%;
    height: 100%;
    background-color: #6d214f;
  }
`;

const ViewBlock = styled.div`
  display: block;
  height: 30px;
  text-align: center;
  background-color: #636e72;
  padding: 3px 0;
  cursor: pointer;
  i {
  }

  span {
    padding-left: 5px;
    font-size: 25px;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  display: grid;
  min-height: 100vh;
  max-width: 1360px;
  margin: 0px auto;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas: "s p p p";
  grid-template-columns: ${(props) =>
    !props.adap ? "repeat(4, 1fr)" : "repeat(6, 1fr)"};
  ${(props) =>
    !props.adap &&
    `
    grid-template-areas: "s p p p";
  `}
  ${(props) =>
    props.adap &&
    `
    grid-template-areas:
      "s p p p p p"
      "f f f f f f";
  `}
  ${(props) =>
    props.adap &&
    !props.view &&
    `
    grid-template-areas:
      "p p p p p p"
      "f f f f f f";
  `}
`;

const App = () => {
  const [view, setView] = useState(true);
  const a700 = useMediaQuery({ query: "(min-width: 700px)" });

  useEffect(() => {
    if (a700) {
      setView(true);
    }
  }, [a700]);

  const Vs = view ? (
    <Sidebar view={view} setView={setView} a700={a700} />
  ) : null;

  return (
    <Provider store={Store}>
      <Router>
        <Global />
        <All>
          {!view && (
            <ViewBlock onClick={() => setView(!view)}>
              <i className="fas fa-exchange-alt fa-2x view"></i>
              <span> Cinema Classic Shop</span>
            </ViewBlock>
          )}
          <Wrapper adap={a700 ? false : true} view={view}>
            {Vs}

            <Pages />
            {a700 ? null : <Footer />}
          </Wrapper>
        </All>
      </Router>
    </Provider>
  );
};

export default App;
