import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Pages from "./pages/pages";

import "./app.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Pages />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
