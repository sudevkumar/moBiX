import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import NoItemFound from "../components/NoItemFound";
import { calculateDiscountedPrice, URL } from "../utils/URL";

const ShowMobiles = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fettchAllData = async () => {
    try {
      if (id === "allmobiles") {
        const res = await axios.get(URL + `/mobiles`);
        setData(res?.data);
      } else {
        const res = await axios.get(URL + `/mobiles?search=${id}`);
        setData(res?.data);
      }
    } catch (error) {}
  };

  console.log(data);

  useEffect(() => {
    fettchAllData();
  }, []);

  return (
    <div className="w-full relative p-6 min-h-[96vh] h-[120vh] top-14 border bg-[#F1F2F4]">
      <div className=" flex gap-2 text-3xl">
        <p>Showing results for</p>
        <p className=" first-letter:uppercase text-[#2A55E5]">
          {id === "allmobiles" ? "All" : id}
        </p>
      </div>

      {data?.length === 0 ? (
        <NoItemFound notFoundTitle={`There is no product in ${id} mobiles`} />
      ) : (
        <div className=" flex w-full mt-6 relative h-fit">
          {/* left */}
          <div className=" flex flex-col w-[25%] border h-fit fixed">
            <div className=" p-3 border-b">
              <h1 className=" text-xl">Filter</h1>
            </div>
          </div>

          {/* right */}
          <div className=" grid grid-cols-4 w-[70%] h-auto gap-2 right-10 absolute">
            {data?.map((ele, ind) => (
              <Link to={`/product/details/${ele._id}`}>
                <div
                  className=" w-[full] ml-2 h-auto  flex flex-col gap-2 border  border-gray-300 p-3 cursor-pointer"
                  key={ele._id}
                >
                  <img
                    src={ele.mainPhoto}
                    alt=""
                    className=" object-contain h-[155px] w-[90%] m-auto"
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
        </div>
      )}
    </div>
  );
};

export default ShowMobiles;
