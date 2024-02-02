import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { calculateDiscountedPrice, URL } from "../utils/URL";
import { MdCurrencyRupee } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const { user } = useContext(UserContext);
  const naviagte = useNavigate();

  const getCartDataFromUserId = async () => {
    try {
      const res = await axios.get(URL + `/cart/${user?.info?._id}`);
      setCartProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartDataFromUserId();
  }, []);

  const calculateDiscountTotalTotal = () => {
    return cartProduct.reduce((total, item) => {
      return (
        total + calculateDiscountedPrice(item.price, item.discount) * item.qty
      );
    }, 0);
  };

  const calculateTotal = () => {
    return cartProduct.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  };

  const removeItemFromTheCart = async (id) => {
    try {
      await axios.delete(URL + `/cart/${id}`);
      getCartDataFromUserId();
      toast.success("Item has been removed from the cart!");
    } catch (error) {
      console.log(error);
    }
  };

  const goToAddressPage = () => {
    naviagte("/address");
    const payload = {
      cartProduct: cartProduct,
      totalPrice: calculateTotal(),
      totalDiscountPrice: calculateDiscountTotalTotal(),
    };

    localStorage.setItem("cart", JSON.stringify(payload));
  };

  return (
    <div className="w-full relative min-h-[95vh] p-6 top-14 border bg-[#F1F2F4] flex justify-center">
      {cartProduct.length === 0 ? (
        <div className=" w-full h-[95vh] flex justify-center items-center">
          <p>No item in cart!</p>
        </div>
      ) : (
        <div className=" flex justify-center gap-5">
          <div className=" flex flex-col w-[60%] h-fit p-6 bg-white gap-5">
            {cartProduct?.map((cart, ind) => (
              <div className=" w-full p-2 border flex gap-8">
                <img src={cart?.mainPhoto} alt="" className=" h-[169px]" />
                <div className=" flex flex-col gap-4">
                  <div className=" flex items-center justify-between">
                    <div className=" flex flex-col ">
                      <p>
                        {cart?.title.length > 55
                          ? cart?.title.substring(0, 55) + "..."
                          : cart?.title}
                      </p>
                      <p>{cart?.sellerName}</p>
                    </div>

                    <div
                      className=" group p-2 border rounded-md border-red-600 hover:border-none hover:bg-red-600 cursor-pointer"
                      onClick={() => removeItemFromTheCart(cart?._id)}
                    >
                      <MdDelete className=" fill-red-600 group-hover:fill-white" />
                    </div>
                  </div>
                  <p>{cart?.desc}</p>
                  <div className=" flex gap-8">
                    <p className=" flex items-center text-xs text-gray-500 line-through">
                      <MdCurrencyRupee />
                      {cart?.price}
                    </p>
                    <p className=" flex items-center text-green-600 text-sm">
                      <MdCurrencyRupee />
                      {calculateDiscountedPrice(cart?.price, cart?.discount)}
                    </p>
                    <p className=" flflex items-centerex text-green-600 text-xs font-semibold">
                      {cart?.discount}% off
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className=" w-full p-5 shadow-lg flex justify-end">
              <button
                className=" py-3 text-white w-[30%] bg-[#FB641B]"
                onClick={goToAddressPage}
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Right */}
          <div className=" w-[22%] border h-fit bg-white shadow-sm">
            <div className=" py-2 px-3 border-b">
              <h3 className=" text-sm text-gray-300 font-bold">
                PRICE DETAILS
              </h3>
            </div>
            <div className=" py-4 px-3 flex gap-5 flex-col">
              <div className=" flex justify-between">
                <p className=" text-sm">Price ({cartProduct.length} item)</p>
                <div className=" flex items-center">
                  <MdCurrencyRupee className=" text-sm" />
                  <p className=" text-sm">
                    {calculateTotal().toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className=" flex justify-between">
                <p className=" text-sm">Discount</p>
                <div className=" flex items-center text-green-500">
                  -<MdCurrencyRupee className=" text-sm fill-green-500" />
                  <p className=" text-sm ">
                    {(
                      calculateTotal() - calculateDiscountTotalTotal()
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className=" border-b border-dashed	"></div>

              <div className=" flex justify-between">
                <p className=" text-base font-bold">Total Amount</p>
                <div className=" flex items-center font-bold">
                  <MdCurrencyRupee className=" text-base font-bold" />
                  <p className=" text-base ">
                    {calculateDiscountTotalTotal().toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className=" border-b border-dashed	"></div>

              <p className=" text-xs text-center text-green-500 font-bold">
                You will save{" "}
                {(
                  calculateTotal() - calculateDiscountTotalTotal()
                ).toLocaleString("en-IN")}{" "}
                on this order
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
