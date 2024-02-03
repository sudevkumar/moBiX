import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryNavbar from "../components/CategoryNavbar";
import ProductSlider from "../components/ProductSlider";
import Slider from "../components/Slider";
import { URL } from "../utils/URL";
import Loader from "../components/Loader";

const Home = ({ getCartDataFromUserId }) => {
  const [appleSlides, setAppleSlides] = useState([]);
  const [samsungSlides, setSamsungSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSliderAppleProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL + `/mobiles?search=apple`);
      setAppleSlides(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchSliderSamsungProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL + `/mobiles?search=samsung`);
      setSamsungSlides(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderAppleProducts();
    fetchSliderSamsungProducts();
    getCartDataFromUserId();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Home;
