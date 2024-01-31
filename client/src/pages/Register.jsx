import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../utils/URL";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState(false);
  const naviagte = useNavigate();

  const handleRegister = async () => {
    try {
      const payload = {
        name,
        email,
        password,
        secretAnswer: answer,
        role,
      };

      const res = await axios.post(URL + "/auth/register", payload);
      naviagte("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full relative top-14 flex justify-center items-center h-[85vh]">
      <div className=" w-[40%] h-[auto] shadow-md bg-white rounded-md p-4 flex flex-col gap-4">
        <h1 className=" text-3xl text-[#2A55E5] mb-5 underline">
          Register Now
        </h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter your name..."
          className=" w-full py-2 px-4 border outline-none placeholder:text-[#d0d3d9] border-[#d0d3d9] rounded-md text-[#afb7c6]"
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter your favourite game...(always rememer the answer!)"
          className=" w-full py-2 px-4 border outline-none placeholder:text-[#d0d3d9] border-[#d0d3d9] rounded-md text-[#afb7c6]"
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button
          className=" w-full py-2 px-4 bg-[#2A55E5] text-white rounded-md cursor-pointer"
          onClick={handleRegister}
        >
          Register
        </button>
        <Link to="/login">
          <p className=" text-center text-sm">
            Already have an account?{" "}
            <span className="text-[#2A55E5] cursor-pointer">Log In Now!</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
