import React, { useState } from "react";
import { IoIosSearch, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineStorefront } from "react-icons/md";
import { SiQzone } from "react-icons/si";
import { PiPackageThin, PiGiftLight } from "react-icons/pi";
import { CiHeart, CiCreditCard1 } from "react-icons/ci";

const Navbar = () => {
  const [mouseEnter, setMouseEnter] = useState(false);

  console.log(mouseEnter);

  return (
    <div className="h-[60px] w-full  fixed p-2 z-10 bg-white">
      <div className="items-center flex gap-[30px] justify-center">
        <img
          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
          alt=""
          className=" h-[30px]"
        />

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

        <div
          className={`flex w-[9%] rounded-md ${
            mouseEnter && "bg-[#2A55E5]"
          } p-[5px] gap-3 items-center justify-center ${
            mouseEnter && "text-white"
          } cursor-pointer font-light text-sm`}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
        >
          <FaRegUserCircle size={16} className="font-light" />
          <p>Login</p>
          <p>
            {mouseEnter ? (
              <IoIosArrowUp size={16} className="font-light" />
            ) : (
              <IoIosArrowDown size={16} className="font-light" />
            )}
          </p>
        </div>

        <div className=" flex w-[5%] items-center gap-2 cursor-pointer ">
          <IoCartOutline size={20} className=" font-thin" />
          <p className="font-light text-sm">Cart</p>
        </div>

        <div className=" flex w-[15%] items-center gap-2 cursor-pointer ">
          <MdOutlineStorefront size={20} className=" font-thin" />
          <p className="font-light text-sm">Become a Seller</p>
        </div>
      </div>

      {mouseEnter && (
        <div
          className=" absolute h-[auto] w-[22%] bg-white shadow-lg top-[43px] right-[243px] rounded-md"
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
        >
          <div className=" flex justify-between p-3">
            <p className="tracking-wide">New Customer?</p>
            <p className=" text-[#2A55E5] cursor-pointer">Sign Up</p>
          </div>

          <hr />

          <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
            <FaRegUserCircle />
            My Profile
          </p>

          <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
            <SiQzone size={21} />
            Flipkart Plus Zone
          </p>

          <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
            <PiPackageThin size={22} />
            Orders
          </p>

          <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
            <CiHeart size={22} />
            Wishlist
          </p>

          <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
            <PiGiftLight size={22} />
            Rewards
          </p>

          <p className=" p-3 flex gap-2 items-center font-light cursor-pointer">
            <CiCreditCard1 size={22} />
            Gift Cards
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
