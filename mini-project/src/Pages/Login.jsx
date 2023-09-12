import React, { useEffect, useState } from "react";
import Input from "../Component/Input";
import axios from "axios";
import Button from "../Component/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = (props) => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(localStorage.getItem("user_id"))
// console.log(userId);
if (userId) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tidak Bisa Akses Halaman Ini, Harus Logout dulu!!!",
      });
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000);
}
    const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    const newInput = { ...input };
    newInput[e.target.name] = e.target.value;
    setInput(newInput);
  };

  return (
    <div className=" flex justify-center min-h-screen items-center">
      <div className="mx-5 w-full max-w-sm p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          {/* <form action="" onSubmit={()=>{props.onSubmit(input.email, input.password)}} className='px-20 py-10'> */}
          <Input
            onChange={handleChange}
            value={input.email}
            type="text"
            name="email"
            placeholder=""
          >
            Email
          </Input>
          <Input
            onChange={handleChange}
            value={input.password}
            type="password"
            name="password"
            placeholder=""
          >
            Password
          </Input>
          <Button
            onClick={() => {
              props.onClick(input.email, input.password);
            }}
            classname="bg-blue-600 "
          >
            Login
          </Button>
          {/* </form> */}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              <Link to={"/register"}>Create account</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
