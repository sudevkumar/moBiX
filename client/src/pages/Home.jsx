import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryNavbar from "../components/CategoryNavbar";
import ProductSlider from "../components/ProductSlider";
import Slider from "../components/Slider";
import { URL } from "../utils/URL";

const Home = () => {
  const [appleSlides, setAppleSlides] = useState([]);
  const [samsungSlides, setSamsungSlides] = useState([]);

  const fetchSliderAppleProducts = async () => {
    try {
      const res = await axios.get(URL + `/mobiles?search=apple`);

      setAppleSlides(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSliderSamsungProducts = async () => {
    try {
      const res = await axios.get(URL + `/mobiles?search=samsung`);

      setSamsungSlides(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliderAppleProducts();
    fetchSliderSamsungProducts();
  }, []);

  return (
    <div className="w-full relative p-6 top-14 border bg-[#F1F2F4]">
      <CategoryNavbar />
      <Slider />
      <ProductSlider
        sliderTitle="Searching for an Iphone?"
        slides={appleSlides}
      />
      <ProductSlider
        sliderTitle="Searching for a Samsung?"
        slides={samsungSlides}
      />
    </div>
  );
};

export default Home;
