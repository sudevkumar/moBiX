import React from "react";
import CategoryNavbar from "../components/CategoryNavbar";
import ProductSlider from "../components/ProductSlider";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div className="w-full relative p-6 top-14 border bg-[#F1F2F4]">
      <CategoryNavbar />
      <Slider />
      <ProductSlider />
    </div>
  );
};

export default Home;
