import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BsFillArrowRightCircleFill
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BsFillArrowLeftCircleFill
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

const Responsive = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    slidesToScroll: 2,
    initialSlide: 0,
    lazyLoad: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-10 sm:px-14 sm md:py-14 py-10 ">
      <h1 className="title md:text-2xl text-xl md:pb-3 pb-2 text-black ml-7">
        Shop By Store
      </h1>
      <div className=" ml-7">
        <Slider {...settings} className="">
          <div className="sm:px-2">
            <img
              src="/mics/vr.webp"
              alt=""
              className="w-96 rounded-xl shadow-md "
              width={300}
              height={200}
            />
          </div>
          <div className="sm:px-2">
            <img
              src="/mics/vr.webp"
              alt=""
              className="w-96 rounded-xl shadow-md "
              width={300}
              height={200}
            />
          </div>
          <div className="sm:px-2">
            <img
              src="/mics/vr.webp"
              alt=""
              className="w-96 rounded-xl shadow-md "
              width={300}
              height={200}
            />
          </div>
          <div className="sm:px-2">
            <img
              src="/mics/vr.webp"
              alt=""
              className="w-96 rounded-xl shadow-md"
              width={300}
              height={200}
            />
          </div>
          <div className="sm:px-2">
            <img
              src="/mics/vr.webp"
              alt=""
              className="w-96 rounded-xl shadow-md "
              width={300}
              height={200}
            />
          </div>
          <div className="sm:px-2">
            <img
              src="/mics/vr.webp"
              alt=""
              className="w-96 rounded-xl shadow-md "
              width={300}
              height={200}
            />
          </div>
          <div className="sm:px-2">
            <img
              src="/mics/vr.webp"
              alt=""
              className="w-96 rounded-xl shadow-md "
              width={300}
              height={200}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Responsive;
