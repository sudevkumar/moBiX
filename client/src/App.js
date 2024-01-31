import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import SellerRegister from "./pages/SellerRegister";
import CreatePost from "./pages/CreatePost";
import SellerDashBoard from "./pages/SellerDashBoard";
import { useContext, useState } from "react";
import { UserContext } from "./context/userContext";
import NotAuthorize from "./pages/NotAuthorize";
import SellerUpdate from "./pages/SellerUpdate";
import GetProductDetails from "./pages/GetProductDetails";
import axios from "axios";
import { URL } from "./utils/URL";
import Cart from "./pages/Cart";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className=" relative w-full">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/details/:id" element={<GetProductDetails />} />
        <Route
          path="/cart"
          element={
            user?.token && !user?.info?.role ? <Cart /> : <NotAuthorize />
          }
        />

        {/* Seller Side */}
        <Route path="/sellerRegister" element={<SellerRegister />} />
        <Route path="/sellerLogin" element={<SellerRegister />} />

        <Route
          path="/createpost"
          element={
            user?.info?.role && user?.token ? <CreatePost /> : <NotAuthorize />
          }
        />

        <Route
          path="/sellerdashboard"
          element={
            user?.info?.role && user?.token ? (
              <SellerDashBoard />
            ) : (
              <NotAuthorize />
            )
          }
        />

        <Route
          path="/updateproduct/:id"
          element={
            user?.info?.role && user?.token ? (
              <SellerUpdate />
            ) : (
              <NotAuthorize />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
