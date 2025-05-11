import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import ListingGrid from "./ListingGrid";
import DetailProduct from "./DetailProduct";
import SearchResults from "../pages/product/SearchResults";
import Cart from "../pages/cart/CartPage";

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Detail" element={<DetailProduct />} />
      <Route path="/Login" element={<UserLogin />} />
      <Route path="/Register" element={<UserRegister />} />
      <Route path="/ListingGrid" element={<ListingGrid />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </main>
);

export default Main;
