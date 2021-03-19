import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./reducers/createStore";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Pages from "./pages/pages";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const StyleApp = styled.div`
  .app {
    display: grid;
    min-height: 100vh;
    max-width: 1360px;
    margin: 0px auto;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "s p p p";
  }

  .viewBlock {
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
  }
  .app__adap {
    display: grid;
    min-height: 100vh;
    max-width: 1360px;
    margin: 0px auto;
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      "s p p p p p"
      "f f f f f f";
  }

  .appView {
    grid-template-areas:
      "p p p p p p"
      "f f f f f f";
  }

  .sidebar {
    grid-area: s;
    background-color: #636e72;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 10px;
    border-right: 4px solid #6d214f;
  }

  .pages {
    grid-area: p;
    background-color: gray;
  }

  .footer {
    grid-area: f;
    width: 100%;
    height: 100%;
    background-color: #6d214f;
  }
`;

const App = () => {
  const [view, setView] = useState(true);
  const a700 = useMediaQuery({ query: "(min-width: 700px)" });

  useEffect(() => {
    if (a700) {
      setView(true);
    }
  }, [a700]);

  const Vs = view ? <Sidebar view={view} setView={setView} /> : null;

  return (
    <Provider store={Store}>
      <Router>
        <StyleApp>
          {!view && (
            <div className="viewBlock" onClick={() => setView(!view)}>
              <i className="fas fa-exchange-alt fa-2x view"></i>
              <span> Cinema Classic Shop</span>
            </div>
          )}
          <div
            className={a700 ? "app" : !view ? "app__adap appView" : "app__adap"}
          >
            {Vs}
            <Pages />
            {a700 ? null : <Footer />}
          </div>
        </StyleApp>
      </Router>
    </Provider>
  );
};

export default App;
