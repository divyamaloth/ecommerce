import { IconContext } from "react-icons";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
} from "react-icons/ai";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/facebook";
import "react-social-icons/instagram";
import "react-social-icons/pinterest";
import "react-social-icons/telegram";
import "react-social-icons/tiktok";
import "react-social-icons/twitter";
import "react-social-icons/whatsapp";

import SubNav from "./SubNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { viewCustomerCart } from "../redux/actions/customer";
import { useDispatch } from "react-redux";
const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = "https://ecommerce.pinksurfing.com";
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  let product_id = searchParams.get("product_id");

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [details, setDetails] = useState(false);
  const [description, setDescription] = useState(false);
  const [productData, setproductData] = useState({
    name: "",
    image: "",
    description: "",
    unit_price: "",
    quantity: 10,
    attributes: [],
    category: "",
    subcategory: "",
  });

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  const onCheckoutProduct = () => {
    navigate(`../checkout?type=product&id=${product_id}`);
  };
  const showDetails = () => setDetails(!details);
  const showDescription = () => setDescription(!description);

  const addToCart = (id) => {
    axios
      .post(
        `${BASE_URL}/api/customer/cart/add/${id}/`,
        {},
        {
          headers: {
            "X-CSRFTOKEN":
              "XY0p5KSoVXwePQWNIZSWps99AIyhspW3AfDkPXg8a5QqzxXIi4jt5cgZqDrUlFh3",
          },
        }
      )
      .then((data) => {
        dispatch(viewCustomerCart());
        if (data.status === 200) {
          toast.success(
            `${
              productData && "name" in productData
                ? productData.name
                : "Current Product"
            } has been added to Cart`,
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to Add product to Cart", {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/product/product/${product_id}/`)
      .then((data) => {
        setproductData(data.data["Products"]);
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error from Fetching products: ${error}`);
      });
  }, []);
  // if (!product_id) {
  //   // Render a loading state or handle the case when product_id is undefined
  //   return <div>Loading...</div>
  // }

  return (
    <div className="relative bg-white w-full  overflow-hidden text-left text-xl text-gray font-inter flex px-11 flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-screen text-black pr-20">
        <div className="grid col-span-full lg:col-span-5 grid-cols-3 grid-rows-5 gap-1 h-full">
          <img
            className="col-span-5 row-span-4 h-full"
            alt=""
            src={`${
              productData ? productData.image : false
            } || "/auth_images/signup2.png" }`}
          />
          <img
            className="row-start-5 mt-4 mr-2"
            alt=""
            src={
              `${productData ? productData.image : false}` ||
              "/auth_images/signup2.png"
            }
          />
          <img
            className="row-start-5 mt-4 ml-1"
            alt=""
            src={
              `${productData ? productData.image : false}` ||
              "/auth_images/signup2.png"
            }
          />
          <img
            className="row-start-5 mt-4 ml-2"
            alt=""
            src={
              `${productData ? productData.image : false}` ||
              "/auth_images/signup2.png"
            }
          />
        </div>
        <div className="grid-col-start-6 rounded-3xs bg-whitesmoke w-3 h-full md:hidden" />

        <div className="flex flex-col content-start items-start justify-center gap-8 grid-col-start-7 col-span-full ml-10 lg:col-span-5">
          <div className=" text-17xl font-medium text-gray">
            {`${productData?.name || "Radiant Glow Serum"}`}
          </div>
          <div className=" font-light text-darkgray flex items-center ">
            {`${
              productData?.description
                ? details
                  ? productData?.description
                  : productData?.description.slice(0, 350)
                : `Experience a radiant transformation with our Radiant Glow Serum.
            Infused with a powerful blend of nourishing botanicals and potent
            antioxidants, this serum deeply hydrates and revitalizes your skin,
            leaving it with a luminous, youthful glow.`
            }`}
          </div>
          <div
            className=" text-blue-600 cursor-pointer flex items-center w-[131px] h-5"
            onClick={showDetails}
          >
            {details ? "Show Less" : "More..."}
          </div>
          <div className="grid lg:grid-col-4 lg:grid-row-2 justify-center lg:justify-between grid-col-1 grid-row-4 gap-4 w-4/5">
            <div className="justify-between grid-col-span-2 font-medium text-gray flex items-center w-[275px] h-12 grid-col-span-2 font-medium text-gray flex items-center ">
              <span>Price</span>
              <span>{productData.unit_price}</span>
            </div>

            <div className=" lg:grid-col-span-2 font-medium text-center flex items-center lg:justify-center h-12 lg:grid-row-start-1 grid-row-start-2 hover:bg-red">
              <div className="bg-black-500 rounded-4xl">
                <IconContext.Provider
                  onMouseEnter={(e) => (e.target.fill = "black")}
                  value={{
                    className: "hover:bg-red",
                    fill: isHeartFilled ? "red" : "white",
                  }}
                >
                  <div onClick={handleHeartClick}>
                    {isHeartFilled ? (
                      <AiTwotoneHeart
                        className="w-10 "
                        fill="red"
                        onMouseOver={(e) => (e.target.fill = "black")}
                      />
                    ) : (
                      <AiOutlineHeart className="w-10 bg-white fill-red hover:bg-grey" />
                    )}
                  </div>
                </IconContext.Provider>
              </div>
              Like this product?
            </div>
            <span
              onClick={onCheckoutProduct}
              href={`/checkout?type=product&id=${product_id}`}
            >
              <button className=" lg:grid-col-span-2 row-start-4 lg:row-start-2 text-white text-center bg-black flex items-center justify-center w-[275px] h-[75px]">
                Buy Now
              </button>
            </span>
            <button
              onClick={() => addToCart(product_id)}
              className=" lg:grid-col-span-2 lg:row-start-2 row-start-3 text-center bg-whitesmoke flex items-center justify-center w-[276px] h-[75px]"
            >
              <AiOutlineShoppingCart
                className="w-10"
                mx-4
              ></AiOutlineShoppingCart>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-auto lg:flex-row lg:gap-2 gap-4 flex-wrap w-screen items-center justify-around mt-10 lg:mb-32 lg:mr-16 lg:ml-0 mb-4">
        <div className="flex flex-col gap-8 justify-evenly my-4 lg:my-0 lg:w-1/3  ">
          <div className="my-4">Description</div>

          <div className=" text-darkgray flex items-center ">
            <div className="[line-break:word] w-full h-full">
              <p className="m-0">
                {`${
                  productData.description
                    ? productData.description.length > 400
                      ? description
                        ? productData.description
                        : productData.description.slice(0, 400)
                      : productData.description
                    : ""
                }`}
              </p>

              <a className="m-0 text-blue-600" onClick={showDescription}>
                {description ? "Show Less" : "More..."}
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 justify-evenly my-4 lg:my-0 lg:w-1/3">
          <div className="my-4">Delivery</div>

          <div className="text-inherit font-inherit text-darkgray whitespace-pre-wrap flex items-center">
            <span className="[line-break:anywhere] w-full">
              <p className="m-1">
                We strive to provide a seamless and efficient delivery
                experience for our customers who choose to purchase our Radiant
                Glow Serum. Here are the details of our delivery process:
              </p>
              <ul className="m-1 pl-[27px]">
                <li>
                  Shipping Options: We offer various shipping options to
                  accommodate your needs. During the checkout process, you can
                  select your preferred shipping method based on speed and cost,
                  such as standard shipping, expedited shipping, or overnight
                  delivery. More...
                </li>
              </ul>
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:justify-center lg:items-center items-start my-4 lg:my-0 lg:mr-10 lg:w-1/5">
          <p>Share</p>
          <div className="flex flex-row w-64 gap-4 flex-wrap">
            <SocialIcon url="https://www.whatsapp.com" />
            <SocialIcon url="https://www.facebook.com" />
            <SocialIcon url="https://www.twitter.com" />
            <SocialIcon url="https://www.instagram.com" />
            <SocialIcon url="https://www.telegram.com" />
            <SocialIcon url="https://www.pinterest.com" />
            <SocialIcon url="https://www.tiktok.com" />
          </div>
        </div>
      </div>

      <div className=" w-16 h-7 mt-12">Products like this</div>
      <div className="relative block flex flex-row flex-wrap gap-8 max-w-screen gap-8 ">
        <div className="w-80 h-80 relative block object-cover flex">
          <img
            className="w-full h-full"
            src="/auth_images/signup1.png"
            alt=""
          />
          <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
        </div>
        <div className="w-80 h-80 relative block object-cover flex">
          <img
            className="w-full h-full"
            src="/auth_images/signup1.png"
            alt=""
          />
          <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
        </div>
        <div className="w-80 h-80 relative block object-cover flex">
          <img
            className="w-full h-full"
            src="/auth_images/signup1.png"
            alt=""
          />
          <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
        </div>
        <div className="w-80 h-80 relative block object-cover flex">
          <img
            className="w-full h-full"
            src="/auth_images/signup1.png"
            alt=""
          />
          <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
        </div>
        <div className="w-80 h-80 relative block object-cover flex">
          <img
            className="w-full h-full"
            src="/auth_images/signup1.png"
            alt=""
          />
          <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
        </div>
        <div className="w-80 h-80 relative block object-cover flex">
          <img
            className="w-full h-full"
            src="/auth_images/signup1.png"
            alt=""
          />
          <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
        </div>
      </div>

      <div className="flex gap-8 justify-between flex-col lg:items-center lg:flex-row items-start ml-4 mb-8">
        <div className="flex flex-col gap-8 items-start lg:items-center justify-center ">
          <div className=" font-light text-white text-center flex items-center justify-center w-[370px] h-[50px]">
            Rate this product
          </div>

          <div className=" text-17xl font-medium flex items-center w-[360px] h-14">{`Ratings `}</div>
          <div className="flex h-12 items-start">
            <AiFillStar className="w-12 h-12" />
            <AiFillStar className="w-12 h-12" />
            <AiFillStar className="w-12 h-12" />
            <AiFillStar className="w-12 h-12" />
            <AiFillStar className="w-12 h-12" />
          </div>
          <div className=" font-light text-black flex items-center w-[374px] h-[42px]">
            4.8/5 based on 500+ customer reviews
          </div>
          <button className="bg-black font-light text-white text-center flex items-center justify-center w-[370px] h-[50px]">
            Rate this product
          </button>
        </div>
        <div className="flex flex-col items-start justify-between h-[496px]">
          <div className=" text-17xl font-medium flex items-center w-[360px] h-14">
            Reviews
          </div>

          <div className="text-inherit font-light font-inherit flex items-center w-[651px] h-[284px]">
            <ul
              className="pl-[27px] w-screen mx-8"
              style={{ listStyle: "square" }}
            >
              <li className="mb-0">
                &quot;This serum is a game-changer! My skin feels incredibly
                hydrated and looks so radiant. It has improved my complexion and
                reduced the appearance of fine lines.&quot; - Emily S.
              </li>
              <li className="mb-0">
                &quot;I&apos;ve tried many serums, but this one truly delivers.
                My skin feels smoother, more plump, and has a healthy glow.
                It&apos;s a staple in my skincare routine now.&quot; - James P.
              </li>
              <li>
                &quot;The Radiant Glow Serum has transformed my skin. I
                struggled with dullness and uneven texture, but after using this
                serum, my complexion has never looked better. Highly
                recommended!&quot; - Sarah L.
              </li>
            </ul>
          </div>
          <div className=" inline-block w-[169px] h-7">More like this</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
