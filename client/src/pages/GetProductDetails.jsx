import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoComponent from "../components/PhotoComponent";
import { MdCurrencyRupee } from "react-icons/md";

const GetProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const findASingleProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/mobiles/${id}`);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findASingleProduct();
  }, []);

  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  return (
    <div className="w-full relative p-6 top-14 bg-[#F1F2F4] flex gap-3">
      {/* left */}
      <PhotoComponent data={data} />

      {/* right */}

      <div className=" w-[48%] flex flex-col gap-3">
        <p className=" text-[20px]">{data?.title}</p>

        <p className=" text-[13px] text-gray-500">
          Seller name:{data?.sellerName}
        </p>

        <p className=" text-[14px] font-light">{data?.desc}</p>

        <div className=" flex items-center gap-5">
          <p className=" text-[35px] font-bold flex items-center text-green-800">
            <MdCurrencyRupee />
            {calculateDiscountedPrice(data?.price, data?.discount)}
          </p>
          <p className=" text-[15px] font-light flex items-center line-through">
            <MdCurrencyRupee />
            {data?.price}
          </p>

          <p className=" text-[15px]  flex items-center text-green-600 font-bold">
            {data?.discount}% off
          </p>
        </div>

        <p className=" text-[14px] flex gap-1 items-center text-green-600">
          You have saved
          <span className=" text-[14px] text-green-800">
            {data.price - calculateDiscountedPrice(data?.price, data?.discount)}
          </span>
          in this product.
        </p>

        <div className=" flex flex-col border border-gray-400 w-full">
          <div className=" w-full px-4 py-3 border-b border-b-gray-400">
            Product Details
          </div>
          <div className=" flex py-2 px-4 gap-2">
            <img
              className=" w-[180px] h-[180px]"
              src={data?.prodDescImg}
              alt=""
            />
            <p className=" text-[10px]">{data?.prodDescTitle}</p>
          </div>
        </div>

        <div className=" flex flex-col border border-gray-400 w-full">
          <div className=" w-full px-4 py-3 border-b border-b-gray-400">
            Specifications
          </div>

          <div className=" w-full px-4 py-3 flex border-b border-b-gray-400 flex-col gap-3">
            <h3 className="">General</h3>
            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">In The Box</p>
              <p className="text-black text-xs">{data?.inTheBox}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">Model Number</p>
              <p className="text-black text-xs">{data?.modelNumber}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs w-[120px]">Model Name</p>
              <p className="text-black text-xs">{data?.modelName}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">Model Name</p>
              <p className="text-black text-xs">{data?.modelName}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">Color</p>
              {data?.color?.map((ele, ind) => (
                <p
                  className={`bg-[${ele}] ${
                    ele === "white" ? "text-black" : "text-white"
                  } py-1 px-2`}
                >
                  {ele}
                </p>
              ))}
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">Browse Type</p>
              <p className="text-black text-xs">{data?.browserType}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">Touchscreen</p>
              <p className="text-black text-xs">
                {data?.touchScreen ? "Yes" : "No"}
              </p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Quick Charging
              </p>
              <p className="text-black text-xs">
                {data?.quickCharging ? "Yes" : "No"}
              </p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">SIM Type</p>
              <p className="text-black text-xs">{data?.SIMType}</p>
            </div>

            {/* end */}
          </div>

          <div className=" w-full px-4 py-3 flex border-b border-b-gray-400 flex-col gap-3">
            <h3 className="">Display Features</h3>
            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">Display Size</p>
              <p className="text-black text-xs">{data?.displaySize}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">Resolution</p>
              <p className="text-black text-xs">{data?.resolution}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs w-[120px]">
                Resolution Type
              </p>
              <p className="text-black text-xs">{data?.resolutionType}</p>
            </div>

            {/* end */}
          </div>

          <div className=" w-full px-4 py-3 flex border-b border-b-gray-400 flex-col gap-3">
            <h3 className="">Os & Processor Features</h3>
            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Operating System
              </p>
              <p className="text-black text-xs">{data?.operatingSystem}</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Processor Brand
              </p>
              <p className="text-black text-xs">{data?.processorBrand}</p>
            </div>

            {/* end */}
          </div>

          <div className=" w-full px-4 py-3 flex border-b border-b-gray-400 flex-col gap-3">
            <h3 className="">Memory & Storage Features</h3>
            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Memory & Storage Features
              </p>
              {data?.internalStorage?.map((ele, ind) => (
                <p className="text-black text-xs py-1 px-2 border-2 flex justify-center items-center rounded-md">
                  {ele}
                </p>
              ))}
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">RAM</p>
              {data?.RAM?.map((ele, ind) => (
                <p className="text-black text-xs py-1 px-2 border-2 flex justify-center items-center rounded-md">
                  {ele}
                </p>
              ))}
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Expandable Storage
              </p>
              <p className="text-black text-xs">{data?.expandableStorage}</p>
            </div>
          </div>

          <div className=" w-full px-4 py-3 flex border-b border-b-gray-400 flex-col gap-3">
            <h3 className="">Battery & Power Features</h3>
            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Battery Capacity
              </p>
              <p className="text-black text-xs">{data?.batteryCapacity}</p>
            </div>
          </div>

          <div className=" w-full px-4 py-3 flex flex-col gap-3">
            <h3 className="">Warranty</h3>
            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Warranty Summary
              </p>
              <p className="text-black text-xs">
                1 Year Warranty for Phone and 6 Months Warranty for In-Box
                Accessories
              </p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Warranty Service Type
              </p>
              <p className="text-black text-xs">NA</p>
            </div>

            <div className=" flex gap-10">
              <p className=" text-gray-400 text-xs  w-[120px]">
                Domestic Warranty
              </p>
              <p className="text-black text-xs">1 Year</p>
            </div>
          </div>

          {/* end */}
        </div>
      </div>
    </div>
  );
};

export default GetProductDetails;
