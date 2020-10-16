import React from "react";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Pages from "./pages/home";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Pages />
      <Footer />
    </div>
  );
}

export default App;
