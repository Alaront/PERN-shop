import React from 'react';
import {Routes} from "react-router";
import Main from "./pages/Main";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import {Route} from "react-router-dom";
import Header from "./elements/Header";
import Footer from "./elements/Footer";
import ShopPage from "./pages/ShopPage";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminProducts from "./Components/Admin/Products/AdminProducts";
import AdminUsers from "./Components/Admin/Users/AdminUsers";
import AdminBrands from "./Components/Admin/Brands/AdminBrands";
import AdminProductsType from "./Components/Admin/ProductsType/AdminProductsType";
import AdminBrandNew from "./Components/Admin/Brands/AdminBrandNew";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product" element={<Product />} />
          <Route path="/shopPage" element={<ShopPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/*" element={<Admin />} >
              <Route path="products" element={<AdminProducts />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="productsType" element={<AdminProductsType />} />
              <Route path="brandNew" element={<AdminBrandNew />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
