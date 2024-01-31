import React, { useContext, useEffect, useState } from "react";
import { IoIosSearch, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineStorefront } from "react-icons/md";
import { SiQzone } from "react-icons/si";
import { PiPackageThin, PiGiftLight } from "react-icons/pi";
import { CiHeart, CiCreditCard1 } from "react-icons/ci";
import { UserContext } from "../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../utils/URL";

const Navbar = () => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const { user } = useContext(UserContext);
  const { logOut, setLogOut } = useContext(UserContext);
  const [cartQty, setCartQty] = useState(0);
  const naviagte = useNavigate();
  const location = useLocation();
  const users = JSON.parse(localStorage.getItem("token"));
  console.log(users);

  console.log(location);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLogOut(!logOut);
    setCartQty(0);
    naviagte("/");
    toast.success("Logout successfully!");
  };

  const handleBecomeASeller = () => {
    localStorage.removeItem("token");
    setLogOut(!logOut);
    naviagte("/sellerLogin");
  };

  const checkAddToCartOrNot = async () => {
    try {
      const res = await axios.get(URL + `/cart/${users?.info?._id}`);
      setCartQty(res?.data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAddToCartOrNot();
  }, [users?.info?._id]);

  const goToCartPage = () => {
    naviagte("/cart");
  };

  return (
    <div className="h-[60px] w-full  fixed p-2 z-10 bg-[white]">
      <div className="items-center flex gap-[30px] justify-center">
        <Link to="/">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
            alt=""
            className=" h-[30px]"
          />
        </Link>

        <div className="w-[40%] bg-[#F0F5FF] p-[5px]  rounded-md flex items-center">
          <IoIosSearch size={22} className=" cursor-pointer text-gray-500" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for Products, Brands and More"
            className=" w-[100%] bg-transparent px-2 placeholder:text-sm text-gray-500 placeholder:text-gray-500 outline-none"
          />
        </div>

        {user ? (
          <div
            className={`flex w-[9%] rounded-md ${
              mouseEnter && "bg-[#2A55E5]"
            } p-[5px] gap-3 items-center justify-center ${
              mouseEnter && "text-white"
            } cursor-pointer font-light text-sm`}
            onMouseEnter={() => setMouseEnter(true)}
          >
            <FaRegUserCircle size={16} className="font-light" />
            <p>{user?.info?.name}</p>
            <p>
              {mouseEnter ? (
                <IoIosArrowUp size={16} className="font-light" />
              ) : (
                <IoIosArrowDown size={16} className="font-light" />
              )}
            </p>
          </div>
        ) : (
          <div
            className={`flex w-[9%] rounded-md ${
              mouseEnter && "bg-[#2A55E5]"
            } p-[5px] gap-3 items-center justify-center ${
              mouseEnter && "text-white"
            } cursor-pointer font-light text-sm`}
            onMouseEnter={() => setMouseEnter(true)}
          >
            <FaRegUserCircle size={16} className="font-light" />
            <Link to="/login">
              <p onClick={() => setMouseEnter(false)}>Login</p>
            </Link>
            <p>
              {mouseEnter ? (
                <IoIosArrowUp size={16} className="font-light" />
              ) : (
                <IoIosArrowDown size={16} className="font-light" />
              )}
            </p>
          </div>
        )}

        <div
          className=" flex w-[15%] items-center gap-2 cursor-pointer relative"
          onClick={goToCartPage}
        >
          <IoCartOutline size={20} className=" font-thin" />
          <div className=" absolute -top-3 w-4 h-4 text-xs text-white flex justify-center items-center rounded-full bg-[#2A55E5] ">
            {cartQty}
          </div>

          <p className="font-light text-sm">Cart</p>
        </div>

        <div className=" flex w-[15%] items-center gap-2 cursor-pointer ">
          <MdOutlineStorefront size={20} className=" font-thin" />
          <p className="font-light text-sm" onClick={handleBecomeASeller}>
            Become a Seller
          </p>
        </div>
      </div>

      {mouseEnter && (
        <div
          className=" absolute h-[auto] w-[22%] bg-white shadow-lg top-[43px] right-[310px] rounded-md"
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
        >
          {user ? (
            <div className=" flex justify-between p-3">
              <p className="tracking-wide">Ohk Bye!</p>
              <p
                className=" text-[#2A55E5] cursor-pointer"
                onClick={handleLogOut}
              >
                Log Out
              </p>
            </div>
          ) : (
            <div className=" flex justify-between p-3">
              <p className="tracking-wide">New Customer?</p>
              <Link to="/register">
                <p className=" text-[#2A55E5] cursor-pointer">Sign Up</p>
              </Link>
            </div>
          )}

          <hr />

          {!user?.info?.role && (
            <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
              <FaRegUserCircle />
              My Profile
            </p>
          )}

          {!user?.info?.role ? (
            <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
              <SiQzone size={21} />
              Flipkart Plus Zone
            </p>
          ) : (
            <Link to="/createpost">
              {" "}
              <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
                <SiQzone size={21} />
                Create A Post
              </p>
            </Link>
          )}

          <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
            <PiPackageThin size={22} />
            Orders
          </p>

          {!user?.info?.role && (
            <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
              <CiHeart size={22} />
              Wishlist
            </p>
          )}

          {!user?.info?.role && (
            <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
              <PiGiftLight size={22} />
              Rewards
            </p>
          )}

          {!user?.info?.role && (
            <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
              <CiCreditCard1 size={22} />
              Gift Cards
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
