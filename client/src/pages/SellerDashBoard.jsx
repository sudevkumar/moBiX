import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { MdCurrencyRupee } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { URL } from "../utils/URL";

const SellerDashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const naviagte = useNavigate();

  const fetchSellerProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/mobiles/seller/${user?.info?._id}`,
        {
          headers: {
            Authorization: user?.token,
            "Content-type": "application/json",
          },
        }
      );
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(URL + `/mobiles/${id}`, {
        headers: {
          Authorization: user?.token,
          "Content-type": "application/json",
        },
      });
      fetchSellerProducts();
      setLoading(false);
      naviagte("/xxx");
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Please try again later!");
      setLoading(false);
    }
  };

  return (
    <div className=" w-full relative p-6 top-14 border bg-[#F1F2F4] min-h-[92vh]">
      <h1 className=" text-3xl">All Your Products</h1>
      <h3 className=" text-gray-400">
        You can delete and update your products from here!
      </h3>

      {data.length === 0 ? (
        "No Post Yet"
      ) : (
        <div className=" grid grid-cols-5 gap-2 mt-6">
          {data?.map((pro, ind) => (
            <div
              className=" border w-full h-[60] p-3 flex flex-col gap-3 bg-white"
              key={pro._id}
            >
              <img
                src={pro.mainPhoto}
                alt={pro.title}
                className=" h-60 w-full object-contain"
              />
              <p className=" text-sm font-bold">
                {pro.title.length > 25
                  ? pro.title.substring(0, 25) + "..."
                  : pro.title}
              </p>

              <p className=" text-sm">
                {pro.desc.length > 80
                  ? pro.desc.substring(0, 80) + "..."
                  : pro.title}
              </p>

              <div className=" flex justify-between">
                <div className=" flex flex-col gap-2">
                  <p className="text-[12px]  font-bold flex items-center  text-green-700">
                    <MdCurrencyRupee />
                    {calculateDiscountedPrice(pro.price, pro.discount)}
                  </p>
                  <p className=" text-[9px] -mt-2  font-bold flex items-center text-red-700 line-through">
                    <MdCurrencyRupee />
                    {pro.price}
                  </p>
                </div>
                <div className=" flex items-center gap-2">
                  <MdDelete
                    size={22}
                    className=" text-red-700 cursor-pointer"
                    onClick={() => handleDeleteProduct(pro._id)}
                  />
                  <Link to={`/updateproduct/${pro._id}`}>
                    <GrUpdate className=" text-green-700" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashBoard;
