import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const slides = [
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/a039cc8bcb1c4ace.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0f9ecd9ce4f86cfa.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9021283f0be266c1.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ca2843e62171405e.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/4cd6690ef44564f3.jpg?q=20",
];

const AutoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-60 mt-5">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white h-[80px] w-[30px] focus:outline-none shadow-lg flex justify-center items-center"
        onClick={prevSlide}
      >
        <FaAngleLeft className=" text-gray-500" />
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white h-[80px] w-[30px] focus:outline-none shadow-lg flex justify-center items-center"
        onClick={nextSlide}
      >
        <FaAngleRight className=" text-gray-500" />
      </button>
    </div>
  );
};

export default AutoSlider;
