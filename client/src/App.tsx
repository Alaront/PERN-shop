import React, {useEffect} from 'react';
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
import AddProduct from "./pages/addProduct";
import {$authHost, $host} from "./axios";
import {setIsAuth, setUser} from "./redux/slice/user";
import jwtDecode from "jwt-decode";
import {useAppDispatch} from "./redux/helpers";
import EditProduct from "./pages/editProduct";
import EditProductPhoto from "./pages/EditProductPhoto";
import UserOperation from "./pages/UserOperation";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        ///console.log('Effect')
        $authHost.get('/user/check')
            .then(response => {
                dispatch(setUser(jwtDecode(response.data.token)))
                dispatch(setIsAuth(true))
                localStorage.setItem('pern-shop-token', response.data.token)
            })
    }, [])



  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shopPage/:id" element={<ShopPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/editProductPhoto/:id" element={<EditProductPhoto />} />
          <Route path="/userOperation/:id" element={<UserOperation />} />
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
