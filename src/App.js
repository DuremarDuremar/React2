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
    grid-template-areas:
      "s p p p"
      "f f f f";
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
    height: 100%;
  }

  .pages {
    grid-area: p;
    background-color: gray;
    height: 100%;
  }

  .footer {
    grid-area: f;
    background-color: green;
    min-height: 30px;
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
            className={
              a700 ? "app" : "app__adap" + `${!view ? " appView" : ""}`
            }
          >
            {Vs}
            <Pages />
            <Footer />
          </div>
        </StyleApp>
      </Router>
    </Provider>
  );
};

export default App;
