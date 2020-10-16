import React from "react";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Pages from "./pages/pages";

import "./app.scss";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Pages />
      <Footer />
    </div>
  );
}

export default App;
