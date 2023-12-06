import React from "react";
import { useNavigate } from "react-router-dom";

const SmallCards = (props) => {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    navigate(`/products/${cat.toLowerCase()}`);
  };

  return (
    <div className="smallcards grid lg:grid-cols-4 xl:grid-cols-8 gap-10 md:gap-2 px-10 md:px-14 pt-14 place-items-center md:gap-y-16 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 text-black">
      <div
        onClick={() => handleClick(props.text1)}
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border
      flex justify-center items-center"
      >
        <img src={props.image1} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text1}
        </div>
      </div>
      <div
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border flex justify-center items-center"
        onClick={() => handleClick(props.text2)}
      >
        <img src={props.image2} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text2}
        </div>
      </div>
      <div
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border flex justify-center items-center"
        onClick={() => handleClick(props.text3)}
      >
        <img src={props.image3} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text3}
        </div>
      </div>
      <div
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border flex justify-center items-center"
        onClick={() => handleClick(props.text4)}
      >
        <img src={props.image4} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text4}
        </div>
      </div>
      <div
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border flex justify-center items-center"
        onClick={() => handleClick(props.text5)}
      >
        <img src={props.image5} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text5}
        </div>
      </div>
      <div
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border flex justify-center items-center"
        onClick={() => handleClick(props.text6)}
      >
        <img src={props.image6} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text6}
        </div>
      </div>
      <div
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border flex justify-center items-center"
        onClick={() => handleClick(props.text7)}
      >
        <img src={props.image7} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text7}
        </div>
      </div>
      <div
        className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border flex justify-center items-center"
        onClick={() => handleClick(props.text8)}
      >
        <img src={props.image8} alt="" className="rounded-xl w-24 h-26" />
        <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
          {props.text8}
        </div>
      </div>
    </div>
  );
};

export default SmallCards;
