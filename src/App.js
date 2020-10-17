import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./reducers/createStore";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Pages from "./pages/pages";

import "./app.scss";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="app">
          <Sidebar />
          <Pages />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
