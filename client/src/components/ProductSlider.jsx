import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductSlider = ({ sliderTitle, slides }) => {
  // Calculate discount price
  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  return (
    <div className=" mt-5 bg-white p-4 text-3xl text-gray-400">
      {sliderTitle}
      <div className=" w-full flex gap-2 mt-6">
        <div className=" whitespace-nowrap gap-5 overflow-auto  w-[100%]">
          {slides.map((ele, ind) => (
            <Link to={`/product/details/${ele._id}`}>
              <div
                className=" w-[200px] ml-2 h-auto  whitespace-nowrap inline-block border border-gray-300 p-3 cursor-pointer"
                key={ele._id}
              >
                <img
                  src={ele.mainPhoto}
                  alt=""
                  className=" object-cover h-[155px] w-[90%] m-auto"
                />
                <p className=" text-center text-sm font-light">
                  {ele.title.substring(0, 20)}...
                </p>

                <p className="text-[12px]  font-bold flex items-center justify-center text-green-700">
                  <MdCurrencyRupee />
                  {calculateDiscountedPrice(ele.price, ele.discount)}
                </p>
                <p className=" text-[9px] -mt-5  font-bold flex items-center justify-center text-red-700 line-through">
                  <MdCurrencyRupee />
                  {ele.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
