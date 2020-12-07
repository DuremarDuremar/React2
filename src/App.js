import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./reducers/createStore";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Pages from "./pages/pages";
import styled from "styled-components";

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

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <StyleApp>
          <div className="app">
            <Sidebar />
            <Pages />
            <Footer />
          </div>
        </StyleApp>
      </Router>
    </Provider>
  );
}

export default App;
