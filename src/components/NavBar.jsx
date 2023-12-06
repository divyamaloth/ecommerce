import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const cartData = useSelector(
    (state) => (state && state.cart && state.cart.cartItems) || []
  );
  const wishlist = useSelector(
    (state) => (state && state.cart && state.cart.wishlist) || []
  );

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpiration");
    setIsLoggedIn(false);
    window.location.replace("/");
  };

  const calculateTotal = useCallback(() => {
    let sum = 0;
    cartData?.map((item, index) => {
      sum += parseFloat(item?.product?.unit_price);
    });
    return sum;
  }, [cartData]);

  return (
    <>
      <div className="navbar bg-[#2d1e5f]">
        <div className="flex-1">
          <Link to="/" className="flex justify-center align-center text-xl">
            <img
              src="/bitcoin.png"
              alt=""
              height={40}
              width={40}
              className="mx-4"
            />
            <span className="flex items-center normal-case text-xl">
              PinkSurfing
            </span>
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-white text-black">
                  {cartData.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-[#51408b] shadow relative z-10"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cartData.length} Items
                </span>
                <span className="text-info">
                  Subtotal: $ {calculateTotal()}
                </span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end z-10">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar.svg" height={40} width={40} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-[#51408b] rounded-box w-72"
            >
              <li>
                <a href="" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link to={"/wishlist"} className="justify-between">
                  {" "}
                  Wishlist {wishlist?.length > 0 && `(${wishlist?.length})`}
                </Link>
              </li>
              <li>
                <a href="" className="justify-between">
                  WLogo My Biz Balance: $1000
                </a>
              </li>
              <li>
                <a href="">Settings</a>
              </li>

              {isLoggedIn ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li>
                  <Link to="/signin">Sigin</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
