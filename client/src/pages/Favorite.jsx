import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import NoItemFound from "../components/NoItemFound";
import { UserContext } from "../context/userContext";
import { calculateDiscountedPrice, URL } from "../utils/URL";

const Favorite = () => {
  const [favorite, setFavorite] = useState([]);
  const { user } = useContext(UserContext);

  const fetchAllFavoriteByUserId = async () => {
    try {
      const { data } = await axios.get(
        URL + `/favorite/prod/${user?.info?._id}`,
        {
          headers: {
            Authorization: user?.token,
            "Content-type": "application/json",
          },
        }
      );

      setFavorite(data);
    } catch (error) {
      toast.error("Somthing went wrong!");
    }
  };

  useEffect(() => {
    fetchAllFavoriteByUserId();
  }, []);

  console.log(favorite);

  return (
    <div className="w-full relative p-6 top-14  bg-[#F1F2F4] flex justify-center">
      {favorite?.length === 0 ? (
        <NoItemFound notFoundTitle={"There is no favoutite product."} />
      ) : (
        <div className=" w-[90%]  grid grid-cols-5">
          {favorite?.map((ele, ind) => (
            <Link to={`/product/details/${ele.prodId}`}>
              <div
                className=" w-[200px] ml-2 h-auto  flex flex-col gap-2 border  border-gray-300 p-3 cursor-pointer"
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
                  {calculateDiscountedPrice(ele?.price, ele?.discount)}
                </p>
                <p className=" text-[9px] font-bold flex items-center justify-center text-red-700 line-through">
                  <MdCurrencyRupee />
                  {ele.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
