import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/userContext";
import { URL } from "../utils/URL";

const SellerUpdate = () => {
  const naviagte = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainPhoto, setMainPhoto] = useState("");
  const [secondPhoto, setSecondPhoto] = useState("");
  const [thirdPhoto, setThirdPhoto] = useState("");
  const [fourthPhoto, setFourthPhoto] = useState("");
  const [fifthPhoto, setFifthPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [packingFee, setPackingFee] = useState("");
  const [sellerReplacement, setSellerReplacement] = useState("");
  const [prodDescImg, setProdDescImg] = useState("");
  const [prodDescTitle, setProdDescTitle] = useState("");
  const [inTheBox, setInTheBox] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [modelName, setModelName] = useState("");
  const [browserType, setBrowserType] = useState("");
  const [quickCharging, setQuickCharging] = useState(false);
  const [touchScreen, setTouchScreen] = useState(false);
  const [SIMType, setSIMType] = useState("");
  const [displaySize, setDisplaySize] = useState("");
  const [resolution, setResolution] = useState("");
  const [resolutionType, setResolutionType] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [processorBrand, setProcessorBrand] = useState("");
  const [expandableStorage, setExpandableStorage] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");

  //   Colors
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);

  const addColorHandleer = () => {
    if (color === "") {
      return toast.error("Categery field can not be empty!");
    }
    let updateColor = [...colors];
    updateColor.push(color);
    setColor("");
    setColors(updateColor);
  };

  const deleteColorHandler = (e) => {
    let updatedCat = [...colors];

    const newF = updatedCat.filter((ele) => ele !== e);
    setColors(newF);
  };

  //   Internal Storage

  const [internalStorage, setInternalStorage] = useState("");
  const [internalStorages, setInternalStorages] = useState([]);

  const addInternalStorageHandleer = () => {
    if (internalStorage === "") {
      return toast.error("Categery field can not be empty!");
    }
    let updateInternalStorage = [...internalStorages];
    updateInternalStorage.push(internalStorage);
    setInternalStorage("");
    setInternalStorages(updateInternalStorage);
  };

  const deleteInternalStorageHandler = (e) => {
    let updateInternalStorage = [...internalStorages];

    const newF = updateInternalStorage.filter((ele) => ele !== e);
    setInternalStorages(newF);
  };

  //   RAM

  const [ram, setRam] = useState("");
  const [rams, setRams] = useState([]);

  const addRamHandleer = () => {
    if (ram === "") {
      return toast.error("RAM field can not be empty!");
    }
    let updateRam = [...rams];
    updateRam.push(ram);
    setRam("");
    setRams(updateRam);
  };

  const deleteRamHandler = (e) => {
    let updateRam = [...rams];

    const newF = updateRam.filter((ele) => ele !== e);
    setRams(newF);
  };

  // getchUser Id and name
  const { user } = useContext(UserContext);

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

  const updateProductHandler = async () => {
    const payload = {
      title: title || data?.title,
      desc: desc || data?.desc,
      mainPhoto: mainPhoto || data?.mainPhoto,
      secondPhoto: secondPhoto || data?.secondPhoto,
      thirdPhoto: thirdPhoto || data?.thirdPhoto,
      fourthPhoto: fourthPhoto || data?.fourthPhoto,
      fifthPhoto: fifthPhoto || data?.fifthPhoto,
      price: price || data?.price,
      discount: discount || data?.discount,
      packingFee: packingFee || data?.packingFee,
      sellerId: user.info._id,
      sellerName: user.info.name,
      sellerReplacement: sellerReplacement || data?.sellerReplacement,
      prodDescTitle: prodDescTitle || data?.prodDescTitle,
      prodDescImg: prodDescImg || data?.prodDescImg,
      inTheBox: inTheBox || data?.inTheBox,
      modelNumber: modelNumber || data?.modelNumber,
      modelName: modelName || data?.modelName,
      color: colors,
      browserType: browserType || data?.browserType,
      quickCharging: quickCharging || data?.quickCharging,
      touchScreen: touchScreen || data?.touchScreen,
      SIMType: SIMType || data?.SIMType,
      displaySize: displaySize || data?.displaySize,
      resolution: resolution || data?.resolution,
      resolutionType: resolutionType || data?.resolutionType,
      operatingSystem: operatingSystem || data?.operatingSystem,
      processorBrand: processorBrand || data?.processorBrand,
      internalStorage: internalStorages,
      RAM: rams,
      expandableStorage: expandableStorage || data?.expandableStorage,
      batteryCapacity: batteryCapacity || data?.batteryCapacity,
    };

    console.log(payload);
    try {
      setLoading(true);
      await axios.put(URL + `/mobiles/${id}`, payload, {
        headers: {
          Authorization: user?.token,
          "Content-type": "application/json",
        },
      });

      setLoading(false);
      naviagte("/sellerdashboard");
      toast.success("Post created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Please try again later!");
      setLoading(false);
    }
  };

  return (
    <div className=" relative top-14">
      <div className="w-full relative p-6 top-14 border bg-[#F1F2F4] flex justify-center items-center flex-col gap-3">
        <div className=" w-[80%] grid grid-cols-2 gap-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Give a title  for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a image url for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setMainPhoto(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a image sub url for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setSecondPhoto(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a image sub url for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setThirdPhoto(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a image sub url for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setFourthPhoto(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a image sub url for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setFifthPhoto(e.target.value)}
          />

          <input
            type="number"
            name=""
            id=""
            placeholder="Give a price for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            name=""
            id=""
            placeholder="Give a discount price for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setDiscount(e.target.value)}
          />

          <input
            type="number"
            name=""
            id=""
            placeholder="Give a packing price for your product...(Price is lower than 10000)"
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setPackingFee(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a replacement days..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setSellerReplacement(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a image url for your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setProdDescImg(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What are you giving in the product box..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setInTheBox(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your model number..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setModelNumber(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your model name..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setModelName(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your browser type..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setBrowserType(e.target.value)}
          />

          <div className=" flex gap-3 px-3 py-2 items-center text-[#afb7c6] bg-white rounded-md">
            <input
              type="checkbox"
              name=""
              id=""
              className=" h-4 w-4"
              onChange={(e) => setQuickCharging(e.target.checked)}
            />
            <p>Is it support fast charging?</p>
          </div>

          <div className="flex gap-3 px-3 py-2 items-center text-[#afb7c6] bg-white rounded-md">
            <input
              type="checkbox"
              name=""
              id=""
              className=" h-4 w-4"
              onChange={(e) => setTouchScreen(e.target.checked)}
            />
            <p>Is this product support touch screen?</p>
          </div>

          <input
            type="text"
            name=""
            id=""
            placeholder="Give a sim type of your product..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setSIMType(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your product display size..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setDisplaySize(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your product resolution..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setResolution(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your product resolution type..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setResolutionType(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your product operating system..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setOperatingSystem(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your product processor brand..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setProcessorBrand(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your product expandable storage..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setExpandableStorage(e.target.value)}
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="What is your product battery capacity..."
            className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6]"
            onChange={(e) => setBatteryCapacity(e.target.value)}
          />
        </div>

        {/* Colors */}

        <div className=" w-[80%] flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-4">
            <input
              type="text"
              name=""
              id=""
              className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6] w-[90%]"
              placeholder="Enter color field again..."
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <button
              className=" text-[#afb7c6] py-2 px-3  bg-white rounded-md"
              onClick={addColorHandleer}
            >
              Add
            </button>
          </div>

          {/* All Coloro */}

          <div className="flex gap-2">
            {colors.length > 0 &&
              colors.map((ele, ind) => (
                <>
                  <div
                    className={`flex items-center gap-3 py-1 rounded-sm bg-[green] w-fit px-3 mt-4 text-white cursor-pointer`}
                    key={ind}
                  >
                    <p>{ele}</p>
                    <p
                      className=" p-1 bg-white rounded-full text-red-600"
                      onClick={() => deleteColorHandler(ele)}
                    >
                      <ImCross size={10} />
                    </p>
                  </div>
                </>
              ))}
          </div>
        </div>

        {/* Internal Storage */}

        <div className=" w-[80%] flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-4">
            <input
              type="text"
              name=""
              id=""
              className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6] w-[90%]"
              placeholder="Enter internal storage field again..."
              value={internalStorage}
              onChange={(e) => setInternalStorage(e.target.value)}
            />

            <button
              className=" text-[#afb7c6] py-2 px-3  bg-white rounded-md"
              onClick={addInternalStorageHandleer}
            >
              Add
            </button>
          </div>

          {/* All Color */}

          <div className="flex gap-2">
            {internalStorages.length > 0 &&
              internalStorages.map((ele, ind) => (
                <>
                  <div
                    className={`flex items-center gap-3 py-1 rounded-sm bg-[red] w-fit px-3 mt-4 text-white cursor-pointer`}
                    key={ind}
                  >
                    <p>{ele}</p>
                    <p
                      className=" p-1 bg-white rounded-full text-red-600"
                      onClick={() => deleteInternalStorageHandler(ele)}
                    >
                      <ImCross size={10} />
                    </p>
                  </div>
                </>
              ))}
          </div>
        </div>

        {/* RAM */}

        <div className=" w-[80%] flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-4">
            <input
              type="text"
              name=""
              id=""
              className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6] w-[90%]"
              placeholder="Enter RAM capasity field again..."
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />

            <button
              className=" text-[#afb7c6] py-2 px-3  bg-white rounded-md"
              onClick={addRamHandleer}
            >
              Add
            </button>
          </div>

          {/* All RAM */}

          <div className="flex gap-2">
            {rams.length > 0 &&
              rams.map((ele, ind) => (
                <>
                  <div
                    className={`flex items-center gap-3 py-1 rounded-sm bg-[orange] w-fit px-3 mt-4 text-white cursor-pointer`}
                    key={ind}
                  >
                    <p>{ele}</p>
                    <p
                      className=" p-1 bg-white rounded-full text-red-600"
                      onClick={() => deleteRamHandler(ele)}
                    >
                      <ImCross size={10} />
                    </p>
                  </div>
                </>
              ))}
          </div>
        </div>

        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Give a sort description of your product..."
          className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6] w-[80%]"
        ></textarea>

        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          onChange={(e) => setProdDescTitle(e.target.value)}
          placeholder="Give a long description of your product..."
          className=" py-2 px-3 rounded-md outline-none placeholder:text-[#d0d3d9] text-[#afb7c6] w-[80%]"
        ></textarea>

        <button
          className="px-3 py-2 w-[80%] text-white bg-[#2A55E5] rounded-md"
          onClick={updateProductHandler}
        >
          {loading ? "Loding..." : "Create A Post"}
        </button>
      </div>
    </div>
  );
};

export default SellerUpdate;
