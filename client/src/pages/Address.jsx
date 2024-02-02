import React, { useEffect, useState } from "react";
import { State, City } from "country-state-city";
import { MdCurrencyRupee } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/URL";

const Address = () => {
  const cartDetails = JSON.parse(localStorage.getItem("cart"));
  const [cash, setCash] = useState(false);
  const user = JSON.parse(localStorage.getItem("token"));
  const naviagte = useNavigate();

  //   Shipping address details
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingStates, setShippingStates] = useState([]);
  const [selectShppingState, setSelectShppingState] = useState("");
  const [shoppingCities, setShoppingCities] = useState([]);
  const [selectedShppingCity, setSelectedShippingCity] = useState("");
  const [count, setCount] = useState(0);
  const [shippingPinCode, setShippingPinCode] = useState("");
  const [cardDetails, setCartDetails] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchState = () => {
    setShippingStates(State.getStatesOfCountry("IN"));
  };

  const handleSetState = (e) => {
    setSelectShppingState(e.target.value);
    setCount((prev) => prev + 1);
  };

  const fetchCities = () => {
    const stateCode = shippingStates.find(
      (ele, ind) => ele.name === selectShppingState
    );
    setShoppingCities(City.getCitiesOfState("IN", stateCode.isoCode));
  };

  useEffect(() => {
    fetchState();
    if (count > 0) {
      fetchCities();
    }
  }, [count]);

  const placeTheOrderAndPayment = async () => {
    if (shippingName === "") {
      return toast.error("Shipping name is a mandatory field!");
    }

    if (shippingAddress === "") {
      return toast.error("Shipping address is a mandatory field!");
    }

    if (selectShppingState === "") {
      return toast.error("Shipping state is a mandatory field!");
    }

    if (selectedShppingCity === "") {
      return toast.error("Shipping city is a mandatory field!");
    }

    if (shippingPinCode === "") {
      return toast.error("Shipping code is a mandatory field!");
    }

    if (shippingPinCode.length > 6 || shippingPinCode.length < 6) {
      return toast.error(
        shippingPinCode.length > 6
          ? "Shipping code length can not be more than 6."
          : "Shipping code length can not be less than 6."
      );
    }

    if (cardDetails === "" && !cash) {
      return toast.error("Cash field is a mandatory!");
    }

    if ((cardDetails.length > 16 || cardDetails.length < 16) && !cash) {
      return toast.error(
        shippingPinCode.length > 6
          ? "Card details length can not be more than 16."
          : "Card details length can not be less than 16."
      );
    }

    if (cvv === "" && !cash) {
      return toast.error("CVV field is a mandatory!");
    }

    if ((cvv.length > 3 || cvv.length < 3) && !cash) {
      return toast.error(
        shippingPinCode.length > 6
          ? "CVV length can not be more than 3."
          : "CVV length can not be less than 3."
      );
    }

    const payload = {
      userId: user?.info?._id,
      userName: user?.info?.name,
      userEmail: user?.info?.email,
      cartProduct: cartDetails?.cartProduct,
      totalDiscountPrice: cartDetails?.totalDiscountPrice,
      totalPrice: cartDetails?.totalPrice,
      shippingName: shippingName,
      shippingAddress: shippingAddress,
      selectShppingState: selectShppingState,
      selectedShppingCity: selectedShppingCity,
      shippingPinCode: shippingPinCode,
      paymentType: cash ? "Cash on delivery" : "Card",
      cardDetails: cardDetails,
      cvv: cvv,
    };

    try {
      setLoading(true);
      await axios.post(URL + "/order/create", payload, {
        headers: {
          Authorization: user?.token,
          "Content-type": "application/json",
        },
      });

      setLoading(false);
      naviagte("/");
      toast.success("Order created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Please try again later!");
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative min-h-[95vh] p-6 top-14 border bg-[#F1F2F4] flex gap-4">
      <div className=" flex flex-col w-[30%] h-fit py-3 px-5 bg-white gap-3">
        <h3 className=" text-2xl">Shipping Address</h3>
        <input
          className=" border py-1 px-3 rounded-md"
          type="text"
          name=""
          id=""
          placeholder="Enter your name..."
          onChange={(e) => setShippingName(e.target.value)}
        />

        <input
          className=" border py-1 px-3 rounded-md"
          type="text"
          name=""
          id=""
          placeholder="Enter your address..."
          onChange={(e) => setShippingAddress(e.target.value)}
        />

        <select
          name=""
          id=""
          className=" py-1 px-3 border rounded-md text-gray-400"
          onChange={handleSetState}
        >
          <option value="">Please Select Your State</option>
          {shippingStates?.map((ele, ind) => (
            <option key={ele.name}>{ele.name}</option>
          ))}
        </select>

        <select
          name=""
          id=""
          className=" py-1 px-3 border rounded-md text-gray-400"
          onChange={(e) => setSelectedShippingCity(e.target.value)}
        >
          <option value="">Please Select Your City</option>
          {shoppingCities?.map((ele, ind) => (
            <option key={ele.name}>{ele.name}</option>
          ))}
        </select>

        <input
          type="number"
          name=""
          id=""
          className=" border py-1 px-3 rounded-md"
          placeholder="Enter your pin code..."
          onChange={(e) => setShippingPinCode(e.target.value)}
        />
      </div>

      <div className=" flex flex-col w-[30%] h-fit py-3 px-5 bg-white gap-3">
        <h3 className=" text-2xl">Payment details</h3>
        <div className=" w-full py-1 px-3 flex  items-center justify-between">
          <p>Total amount to be paid</p>
          <p className="flex  items-center">
            <MdCurrencyRupee />
            {cartDetails.totalDiscountPrice}
          </p>
        </div>
        <div
          className={`w-full py-1 px-3  flex  items-center gap-2 ${
            !cash && " border-b pb-5"
          }`}
        >
          <input
            type="checkbox"
            name=""
            id=""
            className=" h-4 w-4"
            checked={cash && true}
            onChange={(e) => setCash(e.target.checked)}
          />
          Cash on delivery
        </div>

        {!cash && (
          <div className=" w-full flex flex-col gap-3">
            <h3 className=" text-xl">Card Details</h3>
            <div className=" flex border items-center rounded-md">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-payment-gateway-3660044-3094478.png"
                alt=""
                className=" h-6"
              />
              <input
                type="number"
                name=""
                id=""
                className=" py-1 px-3 rounded-md outline-none w-[96%]"
                placeholder="XXXX / XXXX / XXXX/ XXXX"
                onChange={(e) => setCartDetails(e.target.value)}
              />
            </div>

            <input
              type="number"
              name=""
              id=""
              className=" border py-1 px-3 rounded-md"
              placeholder="Enter your CVV..."
              onChange={(e) => setCvv(e.target.value)}
            />

            <button
              className=" w-full py-2 bg-[#FB641B] rounded-md text-white"
              onClick={placeTheOrderAndPayment}
            >
              Pay {cartDetails.totalDiscountPrice} amount
            </button>
          </div>
        )}

        {cash && (
          <button
            className=" w-full py-2 bg-[#FB641B] rounded-md text-white flex items-center justify-center"
            onClick={placeTheOrderAndPayment}
          >
            Place the order <MdCurrencyRupee /> (
            {cartDetails.totalDiscountPrice})
          </button>
        )}
      </div>
    </div>
  );
};

export default Address;
