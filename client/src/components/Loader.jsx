import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[93vh] flex flex-col justify-center items-center ">
      <PuffLoader size={100} color="blue" />
    </div>
  );
};

export default Loader;
