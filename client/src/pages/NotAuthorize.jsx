import React from "react";
import { Link } from "react-router-dom";

const NotAuthorize = () => {
  return (
    <div className="w-full h-[92vh] relative p-6 top-14 border bg-[#F1F2F4] flex justify-center items-center flex-col gap-3">
      <h1 className=" text-3xl">You can not access this page</h1>
      <Link to="/">
        <div className=" p-3 w-fit bg-[#2A55E5] rounded-md text-white border">
          Go To Home Page
        </div>
      </Link>
    </div>
  );
};

export default NotAuthorize;
