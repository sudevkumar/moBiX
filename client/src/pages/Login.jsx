import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { URL } from "../utils/URL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, getUser } = useContext(UserContext);
  const naviagte = useNavigate();

  const handleRegister = async () => {
    try {
      const payload = {
        email,
        password,
      };

      const res = await axios.post(URL + "/auth/login", payload);
      setUser(res?.data);

      localStorage.setItem(
        "token",
        JSON.stringify({ token: res?.data?.token, info: res?.data?.user })
      );
      if (res?.data?.user?.role) {
        getUser();
        naviagte("/sellerdashboard");
        toast.success(`Welcome back ${res?.data?.user?.name}`);
      } else {
        getUser();
        naviagte("/", { state: res?.data?.user?._id });
        toast.success(`Welcome back ${res?.data?.user?.name}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full relative top-14 flex justify-center items-center h-[85vh]">
      <div className=" w-[40%] h-[auto] shadow-md bg-white rounded-md p-4 flex flex-col gap-4">
        <h1 className=" text-3xl text-[#2A55E5] mb-5 underline">Log In Now</h1>

        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your email Id..."
          className=" w-full py-2 px-4 border outline-none placeholder:text-[#d0d3d9] border-[#d0d3d9] rounded-md text-[#afb7c6]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Enter your password..."
          className=" w-full py-2 px-4 border outline-none placeholder:text-[#d0d3d9] border-[#d0d3d9] rounded-md text-[#afb7c6]"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className=" w-full py-2 px-4 bg-[#2A55E5] text-white rounded-md cursor-pointer"
          onClick={handleRegister}
        >
          Log In
        </button>
        <Link to="/login">
          <p className=" text-center text-sm">
            Don't have an account?{" "}
            <span className="text-[#2A55E5] cursor-pointer">Register Now!</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
