import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import SellerRegister from "./pages/SellerRegister";
import CreatePost from "./pages/CreatePost";
import SellerDashBoard from "./pages/SellerDashBoard";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import NotAuthorize from "./pages/NotAuthorize";
import SellerUpdate from "./pages/SellerUpdate";
import GetProductDetails from "./pages/GetProductDetails";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Favorite from "./pages/Favorite";
import axios from "axios";
import { URL } from "./utils/URL";
import ShowMobiles from "./pages/ShowMobiles";

function App() {
  const { setCartQty, user } = useContext(UserContext);
  // const user = JSON.parse(localStorage.getItem("token"));
  const getCartDataFromUserId = async () => {
    try {
      const res = await axios.get(URL + `/cart/${user?.info?._id}`);
      setCartQty(res?.data?.length);
      console.log(res?.data?.length, "Called", user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative w-full">
      <Toaster />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home getCartDataFromUserId={getCartDataFromUserId} />}
          exact
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login getCartDataFromUserId={getCartDataFromUserId} />}
        />
        <Route path="/product/details/:id" element={<GetProductDetails />} />
        <Route
          path="/cart"
          element={
            user?.token && !user?.info?.role ? <Cart /> : <NotAuthorize />
          }
        />
        <Route path="/address" element={<Address />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/mobiles/:id" element={<ShowMobiles />} />

        {/* Seller Side */}
        <Route path="/sellerregister" element={<SellerRegister />} />

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
