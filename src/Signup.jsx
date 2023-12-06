import React, { useState } from "react";
import endpoint from "../utils/endpoint";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

const Signup = () => {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = {
      username: username,
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
      phone_number: phone_number,
    };

    try {
      const response = await axios.post(
        `${endpoint}customer/create-account/`,
        value,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      setData(result); // Assuming you want to update the 'data' state with the response
      console.log(result);
      setSignUpSuccess(true);
      // window.location.replace("/signin");
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error creating account:", error);
    }
  };

  return (
    <>
      <div className="main bg-[#2148c0] h-[88vh] w-full">
        <div className="bg-[url('./assets/authbg.png')] h-full w-full bg-cover">
          {!signUpSuccess ? (
            <div className="box flex flex-col justify-center items-center h-full space-y-2">
              <img src={logo} alt="" className="w-24" />
              <h1 className="font-bold text-2xl">Signup Now</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 border-2 rounded-md p-6"
              >
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent py-1.5 px-3 w-72 rounded-md border-2"
                  placeholder="Username"
                />
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent py-1.5 px-3 w-72 rounded-md border-2"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name=""
                  id=""
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent py-1.5 px-3 w-72 rounded-md border-2"
                  placeholder="Email"
                />
                <input
                  type="number"
                  name=""
                  id=""
                  onChange={(e) => setPhone_number(e.target.value)}
                  className="bg-transparent py-1.5 px-3 w-72 rounded-md border-2"
                  placeholder="Phone number"
                />
                <input
                  type="password"
                  name=""
                  id=""
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent py-1.5 px-3 w-72 rounded-md border-2"
                  placeholder="Password"
                />
                <input
                  type="password"
                  name=""
                  id=""
                  onChange={(e) => setConfirm_password(e.target.value)}
                  className="bg-transparent py-1.5 px-3 w-72 rounded-md border-2"
                  placeholder="Confirm Password"
                />
                <button
                  type="submit"
                  className="bg-white text-blue-900 text-lg font-semibold py-2 rounded-md shadow hover:shadow-md"
                >
                  Signup
                </button>
                <div className="text-right">
                  Already a user?{" "}
                  <Link to="/signin" className="font-semibold">
                    Login now
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className="box flex flex-col justify-center items-center h-full space-y-2">
              <img src={logo} alt="" className="w-24" />
              <h1 className="font-bold text-2xl">
                Welcome aboard! Your signup was successful!!
              </h1>{" "}
              <div className="text-right">
                {/* Already a user?{" "} */}
                <Link
                  to="/signin"
                  className="bg-white text-blue-900 text-lg font-semibold p-2  m-4 rounded-md shadow hover:shadow-md"
                >
                  Login now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
