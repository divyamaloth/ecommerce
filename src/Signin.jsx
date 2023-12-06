import { useState, useEffect } from "react";
import axios from "axios";
import endpoint from "../utils/endpoint";
import logo from "./assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (!isTokenExpired(accessToken)) {
        setIsLoggedIn(true);
      } else {
        refreshAccessToken();
      }
    }
  }, []);

  const isTokenExpired = (accessToken) => {
    const expirationTime = localStorage.getItem("accessTokenExpiration");
    if (!expirationTime) {
      return true;
    }

    const currentTime = Date.now();
    const expirationTimestamp = parseInt(expirationTime, 10);

    const timeDifference = expirationTimestamp - currentTime;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference <= 0;
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post(
        `${endpoint}/token/refresh/`,
        {
          refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem(
          "accessTokenExpiration",
          data.accessTokenExpiration
        );

        setIsLoggedIn(true);

        console.log("Token refresh successful!");
      } else {
        console.log("Token refresh failed!");
        handleLogout();
      }
    } catch (error) {
      console.error("An error occurred during token refresh:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpiration");
    setIsLoggedIn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    try {
      const response = await axios.post(`${endpoint}token/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);

        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem(
          "accessTokenExpiration",
          data.accessTokenExpiration
        );

        setIsLoggedIn(true);

        console.log("Login successful!");
        window.location.replace("/");
      } else {
        const errorData = response.data;
        setError(errorData.message);
        console.log("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  return (
    <>
      <div className="main bg-[#2148c0] h-[88vh] w-full">
        <div className="bg-[url('./assets/authbg.png')] h-full w-full bg-cover">
          <div className="box flex flex-col justify-center items-center h-full space-y-2">
            <img src={logo} alt="" className="w-24" />
            <h1 className="font-bold text-2xl">Login</h1>
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
                type="password"
                name=""
                id=""
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent py-1.5 px-3 w-72 rounded-md border-2"
                placeholder="Password"
              />
              <button
                type="submit"
                className="bg-white text-blue-900 text-lg font-semibold py-2 rounded-md shadow hover:shadow-md"
              >
                Login
              </button>
              <div className="text-right">
                Not a user yet?{" "}
                <Link to="/signup" className="font-semibold">
                  Signup now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
