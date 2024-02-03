import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { URL } from "../utils/URL";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const PhotoComponent = ({ data }) => {
  const [mainPht, setMainPht] = useState("");
  const [favoriteList, setFavoriteList] = useState([]);
  const { user, setCartQty } = useContext(UserContext);
  const { id } = useParams();
  const [qty, setQty] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [checked, setChecked] = useState(false);
  // const {cartQty, setCartQty} = useContext(UserContext);

  const getAllFavorites = async () => {
    try {
      const res = await axios.get(URL + `/favorite/prod/${user?.info?._id}`, {
        headers: {
          Authorization: user?.token,
          "Content-type": "application/json",
        },
      });
      setFavoriteList(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async () => {
    const payload = {
      title: data?.title,
      desc: data?.desc,
      mainPhoto: data?.mainPhoto,
      price: data?.price,
      discount: data?.discount,
      sellerId: data?.sellerId,
      sellerName: data?.sellerName,
      userId: user?.info?._id,
      prodId: data?._id,
    };

    var count = 0;
    for (let i = 0; i < favoriteList.length; i++) {
      if (favoriteList[i].prodId === id) {
        await axios.delete(URL + `/favorite/${favoriteList[i]._id}`, {
          headers: {
            Authorization: user?.token,
            "Content-type": "application/json",
          },
        });
        getAllFavorites();
        toast.success("Item is removed from favorite list!");
        return;
      } else {
        count++;
      }
    }

    if (count === favoriteList.length) {
      await axios.post(URL + "/favorite/create", payload, {
        headers: {
          Authorization: user?.token,
          "Content-type": "application/json",
        },
      });
      getAllFavorites();
      toast.success("Item is added to favorite list!");
    }
  };

  useEffect(() => {
    getAllFavorites();
  }, []);

  const createRedFillToHeart = () => {
    const rees = favoriteList.find((ele, ind) => ele.prodId === id);
    if (rees === undefined) {
      return false;
    } else {
      return true;
    }
  };

  const handleQtyAdd = () => {
    setQty((prev) => prev + 1);
  };

  const handleQtySub = () => {
    if (qty > 0) {
      setQty((prev) => prev - 1);
    }
  };

  const addToCartHanndler = async () => {
    if (!user?.toast) {
      return toast.error("Login first to add products to our cart!");
    }
    try {
      const payload = {
        title: data?.title,
        desc: data?.desc,
        mainPhoto: data?.mainPhoto,
        price: data?.price,
        discount: data?.discount,
        sellerId: data?.sellerId,
        sellerName: data?.sellerName,
        userId: user?.info?._id,
        prodId: data?._id,
        qty: qty,
      };

      if (qty === 0) {
        return toast.error("Product quantity can not be 0!");
      } else {
        await axios.post(URL + "/cart/create", payload, {
          headers: {
            Authorization: user?.token,
            "Content-type": "application/json",
          },
        });
      }
      toast.success("Item is added to cart successfully!");
      checkAddToCartOrNot();
    } catch (error) {
      console.log(error);
    }
  };

  const checkAddToCartOrNot = async () => {
    try {
      const res = await axios.get(URL + `/cart/${user?.info?._id}`);
      const findAddToCartProduct = res?.data?.find((ele) => ele.prodId === id);
      setChecked(findAddToCartProduct === undefined ? false : true);
      setCartQty(res?.data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAddToCartOrNot();
  }, [checked]);

  return (
    <div className="w-[45%] h-[550px] flex flex-col items-center">
      <div className=" flex w-[100%] h-[full] gap-3 ">
        {/* sub photo */}
        <div className="flex flex-col gap-2 w-[17%]">
          {mainPht === "" ? (
            <div
              className={`h-[80px] border-2 border-blue-500 cursor-pointer shadow-sm shadow-blue-800`}
              onClick={() => setMainPht(`${data?.mainPhoto}`)}
            >
              <img
                className="h-full object-contain"
                src={data?.mainPhoto}
                alt=""
              />
            </div>
          ) : (
            <div
              className={`h-[80px] border border-blue-500 ${
                mainPht === data?.mainPhoto &&
                "border-2 border-blue-500 shadow-sm shadow-blue-800"
              } cursor-pointer`}
              onClick={() => setMainPht(`${data?.mainPhoto}`)}
            >
              <img
                className="h-full object-contain"
                src={data?.mainPhoto}
                alt=""
              />
            </div>
          )}
          <div
            className={`h-[80px] border border-blue-500 ${
              mainPht === data?.secondPhoto &&
              "border-2 border-blue-500 shadow-sm shadow-blue-800"
            } cursor-pointer`}
            onClick={() => setMainPht(`${data?.secondPhoto}`)}
          >
            <img
              className="h-full object-contain"
              src={data?.secondPhoto}
              alt=""
            />
          </div>
          <div
            className={`h-[80px] border border-blue-500 ${
              mainPht === data?.thirdPhoto &&
              "border-2 border-blue-500 shadow-sm shadow-blue-800"
            } cursor-pointer`}
            onClick={() => setMainPht(`${data?.thirdPhoto}`)}
          >
            <img className="h-full" src={data?.thirdPhoto} alt="" />
          </div>
          <div
            className={`h-[80px] border border-blue-500 ${
              mainPht === data?.fourthPhoto &&
              "border-2 border-blue-500 shadow-sm shadow-blue-800"
            } cursor-pointer`}
            onClick={() => setMainPht(`${data?.fourthPhoto}`)}
          >
            <img className="h-full" src={data?.fourthPhoto} alt="" />
          </div>
          <div
            className={`h-[80px] border border-blue-500 ${
              mainPht === data?.fifthPhoto &&
              "border-2 border-blue-500 shadow-sm shadow-blue-800"
            } cursor-pointer`}
            onClick={() => setMainPht(`${data?.fifthPhoto}`)}
          >
            <img
              className="h-full object-cover"
              src={data?.fifthPhoto}
              alt=""
            />
          </div>
        </div>

        {/* main photo */}

        <div className=" w-[80%] h-[500px] relative border">
          {mainPht === "" ? (
            <img
              className=" w-full h-full object-contain"
              src={data?.mainPhoto}
              alt=""
            />
          ) : (
            <img
              className=" w-full h-full object-contain"
              src={mainPht}
              alt=""
            />
          )}
          {user?.token && (
            <div
              className=" absolute top-4 right-3 cursor-pointer"
              onClick={toggleFavorite}
            >
              <AiOutlineHeart
                size={28}
                className="fill-white absolute  -top-[2px] -right-[2px]"
              />
              <AiFillHeart
                size={24}
                className={
                  createRedFillToHeart()
                    ? "fill-rose-500"
                    : "fill-neutral-500/70"
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className=" flex mt-5">
        <div
          className={`border py-1 px-4 rounded-tl-full rounded-bl-full text-2xl ${
            qty === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleQtySub}
        >
          -
        </div>
        <div className=" border py-1 px-4 text-2xl">{qty}</div>
        <div
          className=" border py-1 px-4 rounded-tr-full rounded-br-full text-2xl cursor-pointer"
          onClick={handleQtyAdd}
        >
          +
        </div>
      </div>

      {checked === true ? (
        <div className=" flex mt-2 items-center gap-3">
          <FaCheckCircle className=" fill-green-500" />
          <p className=" text-green-500`">
            This product is already added to the cart!
          </p>
        </div>
      ) : (
        <div
          className={`flex items-center gap-3 bg-[#FF9E00] px-20 py-3 text-white rounded-md ${
            qty === 0 ? " cursor-not-allowed" : "cursor-pointer"
          } font-semibold mt-5`}
          onClick={addToCartHanndler}
        >
          <IoCartOutline size={26} />
          Add To Cart
        </div>
      )}
    </div>
  );
};

export default PhotoComponent;
