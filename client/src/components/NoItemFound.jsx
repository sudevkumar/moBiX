import React from "react";
import { Link } from "react-router-dom";

const NoItemFound = ({ notFoundTitle }) => {
  return (
    <div className=" flex w-full h-[85vh] justify-center items-center flex-col gap-3">
      <h1 className=" text-2xl text-red-600">{notFoundTitle}</h1>
      <Link to="/">
        <button className=" px-6 py-2 rounded-md text-white bg-[#fb641b]">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default NoItemFound;
