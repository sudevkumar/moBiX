import React from "react";
import { categoty } from "../assets/categoryNavbar";

const CategoryNavbar = () => {
  return (
    <div className=" bg-white w-full m-auto flex gap-12 py-2 px-5 justify-center">
      {categoty.map((cat, ind) => (
        <div
          className=" flex gap-2 flex-col items-center cursor-pointer hover:text-[#2A55E5]"
          key={cat.name}
        >
          <img src={cat.img} alt={cat.name} className=" h-[55px] w-[50px]" />
          <p className=" text-xs font-bold">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryNavbar;
