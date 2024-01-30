import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const products = [
  { id: 1, name: "Product 1", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Product 4", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Product 5", image: "https://via.placeholder.com/150" },
  { id: 12, name: "Product 1", image: "https://via.placeholder.com/150" },
  { id: 23, name: "Product 2", image: "https://via.placeholder.com/150" },
  { id: 34, name: "Product 3", image: "https://via.placeholder.com/150" },
  { id: 45, name: "Product 4", image: "https://via.placeholder.com/150" },
  { id: 56, name: "Product 5", image: "https://via.placeholder.com/150" },
  { id: 18, name: "Product 1", image: "https://via.placeholder.com/150" },
  { id: 22, name: "Product 2", image: "https://via.placeholder.com/150" },
  { id: 38, name: "Product 3", image: "https://via.placeholder.com/150" },
  { id: 4912, name: "Product 4", image: "https://via.placeholder.com/150" },
  { id: 521, name: "Product 5", image: "https://via.placeholder.com/150" },
];

const ProductSlider = () => {
  return (
    <div className="">
      <div className=" whitespace-nowrap gap-5 overflow-auto mt-5">
        {products.map((ele, ind) => (
          <div className=" w-[200px] ml-2 h-60  whitespace-nowrap inline-block border border-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
