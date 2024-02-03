import React from "react";
import { categoty } from "../assets/categoryNavbar";
import { Link } from "react-router-dom";

const CategoryNavbar = () => {
  return (
    <div className=" bg-white w-full m-auto flex gap-12 py-2 px-5 justify-center items-center">
      {categoty.map((cat, ind) => (
        <Link to={`/mobiles/${cat.nav}`}>
          <div
            className=" flex gap-2 flex-col items-center cursor-pointer hover:text-[#2A55E5]"
            key={cat.name}
          >
            {cat?.img !== "" && (
              <img
                src={cat.img}
                alt={cat.name}
                className=" h-[50px] w-[60px] object-contain"
              />
            )}
            <p className=" text-xs font-bold">{cat.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryNavbar;
