"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/actions/customer";

const Ship = ({
  checkout,
  setCheckout,
  setAddressID,
  addressList,
  addressId,
}) => {
  const dispatch = useDispatch();
  const [userName, setuserName] = useState("");
  const [lastName, setlastName] = useState("");
  const [streetAdd, setStreetAdd] = useState("");
  const [adressOptional, setAdressOptional] = useState("");
  const [country, setCountry] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressId) {
      setCheckout("payment");
    } else {
      dispatch(
        addAddress({
          username: localStorage.getItem("accessToken"),
        })
      ).then((res) => {
        console.log(res);
        setAddressID(res);
        setCheckout("payment");
      });
    }
  };
  const onNext = (e) => {
    setCheckout("payment");
  };

  return (
    <div className="flex flex-col items-center w-full pr-20 -ml-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl  w-11/12 px-4 py-2 "
      >
        <div className="flex flex-col justify-between gap-4 mb-5 p-4">
          <div className="text-black">Saved Address</div>
          {addressList &&
            Array.isArray(addressList) &&
            addressList?.map((items) => {
              return (
                <div className="flex items-center space-x-2" key={items?.id}>
                  <input
                    type="checkbox"
                    id="category-1"
                    value={items?.id}
                    onChange={(e) => setAddressID(e.target.value)}
                    className="rounded border-gray-400 focus:outline-none focus:border-red-500 font-[20px]"
                  />
                  <label htmlFor="category-1" className="text-black">
                    {`${items?.street1} ${items?.street2} ${items?.city} ${items?.country} ${items?.zip_code} `}
                  </label>
                </div>
              );
            })}
        </div>

        <hr />
        <div className="flex flex-row justify-between gap-4 ">
          <input
            className="bg-whitesmoke text-black h-16  rounded-lg px-4 w-1/2 my-4"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={(e) => setuserName(e.target.value)}
          />

          <input
            className="bg-whitesmoke text-black h-16  rounded-lg px-4 w-1/2 my-4"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between gap-4 ">
          <input
            className="bg-whitesmoke text-black h-16  rounded-lg px-4 w-1/2 my-4"
            id="streetAddress"
            name="streetAddress"
            type="text"
            placeholder="Street Address"
            onChange={(e) => setStreetAdd(e.target.value)}
          />
          <input
            className="bg-whitesmoke text-black h-16  rounded-lg px-4 w-1/2 my-4"
            id="apt"
            name="apt"
            type="text"
            placeholder="Apt. (Optional)"
            onChange={(e) => setAdressOptional(e.target.value)}
          />
        </div>
        <input
          className="bg-whitesmoke text-black h-16 mb-4 rounded-lg px-4 w-full"
          id="country"
          name="country"
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          className="mb-4 bg-black rounded-lg h-16 text-center text-white w-full"
          type="submit"
        >
          Submit
        </button>
        <button
          className="mb-4 bg-whitesmoke text-black rounded-lg h-16 text-center text-gray w-full"
          onClick={() => setCheckout(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Ship;
