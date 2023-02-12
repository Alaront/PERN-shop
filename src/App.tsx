import React from 'react';
import {Routes} from "react-router";
import Main from "./pages/Main";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import {Route} from "react-router-dom";
import Header from "./elements/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product" element={<Product />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
