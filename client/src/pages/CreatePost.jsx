import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { URL } from "../utils/URL";

const CreatePost = () => {
  const naviagte = useNavigate();
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

  const createProductHandler = async () => {
    const payload = {
      title,
      desc,
      mainPhoto,
      secondPhoto,
      thirdPhoto,
      fourthPhoto,
      fifthPhoto,
      price,
      discount,
      packingFee,
      sellerId: user.info._id,
      sellerName: user.info.name,
      sellerReplacement,
      prodDescTitle,
      prodDescImg,
      inTheBox,
      modelNumber,
      modelName,
      color: colors,
      browserType,
      quickCharging,
      touchScreen,
      SIMType,
      displaySize,
      resolution,
      resolutionType,
      operatingSystem,
      processorBrand,
      internalStorage: internalStorages,
      RAM: rams,
      expandableStorage,
      batteryCapacity,
    };

    if (title === "") {
      return toast.error("Title field is mandetory!");
    }

    if (desc === "") {
      return toast.error("Description field is mandetory!");
    }

    if (mainPhoto === "") {
      return toast.error("Main photo field is mandetory!");
    }

    if (secondPhoto === "") {
      return toast.error("Second photo field is mandetory!");
    }

    if (thirdPhoto === "") {
      return toast.error("Third photo field is mandetory!");
    }

    if (fourthPhoto === "") {
      return toast.error("Fourth photo field is mandetory!");
    }

    if (fifthPhoto === "") {
      return toast.error("Fifth photo field is mandetory!");
    }

    if (price === "") {
      return toast.error("Price field is mandetory!");
    }

    if (discount === "") {
      return toast.error("Atleast write 0 in discount field!");
    }

    if (packingFee === "") {
      return toast.error("Atleast write 0 in packing fee field!");
    }

    if (sellerReplacement === "") {
      return toast.error("Atleast write 0 in packing fee seller replacement!");
    }

    if (prodDescTitle === "") {
      return toast.error("Prod description title field is mandetory!");
    }

    if (prodDescImg === "") {
      return toast.error("Prod description image field is mandetory!");
    }

    if (inTheBox === "") {
      return toast.error("In box field is mandetory!");
    }

    if (modelNumber === "") {
      return toast.error("Model number field is mandetory!");
    }

    if (modelName === "") {
      return toast.error("Model name field is mandetory!");
    }

    if (colors.length === 0) {
      return toast.error("Color field is mandetory!");
    }

    if (browserType === "") {
      return toast.error("Browser type  field is mandetory!");
    }

    if (SIMType === "") {
      return toast.error("SIM type  field is mandetory!");
    }

    if (displaySize === "") {
      return toast.error("Display size field is mandetory!");
    }

    if (resolution === "") {
      return toast.error("Resolution field is mandetory!");
    }

    if (resolutionType === "") {
      return toast.error("Resolution type field is mandetory!");
    }

    if (operatingSystem === "") {
      return toast.error("Operating system field is mandetory!");
    }

    if (processorBrand === "") {
      return toast.error("Processor brand  field is mandetory!");
    }

    if (internalStorages.length === 0) {
      return toast.error("Internal storage field is mandetory!");
    }

    if (rams.length === 0) {
      return toast.error("RAM field is mandetory!");
    }

    if (expandableStorage === "") {
      return toast.error("Expandable storage field is mandetory!");
    }

    if (batteryCapacity === "") {
      return toast.error("Battery capacity field is mandetory!");
    }

    try {
      setLoading(true);
      await axios.post(URL + "/mobiles/create", payload, {
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
    <div className="w-full relative p-6 top-14 border bg-[#F1F2F4] flex justify-center items-center flex-col gap-3">
      <div className=" w-[80%] grid grid-cols-2 gap-3">
        <input
          type="text"
          name=""
          id=""
          placeholder="Give a title for your product..."
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
            placeholder="Enter your product color..."
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
            placeholder="Enter your product internal storage..."
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
            placeholder="Enter your product RAM capasity..."
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
        onClick={createProductHandler}
      >
        {loading ? "Loding..." : "Create A Post"}
      </button>
    </div>
  );
};

export default CreatePost;
