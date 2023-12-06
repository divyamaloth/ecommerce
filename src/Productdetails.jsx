import { IconContext } from "react-icons";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
} from "react-icons/ai";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "react-social-icons/facebook";
import "react-social-icons/instagram";
import "react-social-icons/pinterest";
import "react-social-icons/telegram";
import "react-social-icons/tiktok";
import "react-social-icons/twitter";
import "react-social-icons/whatsapp";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import endpoint from "../utils/endpoint";
import media from "../utils/media";
import Spinner from "./components/Spinner";
import SubNav from "./components/SubNav";
import { getProductDetails } from "./redux/actions/product";
import {
  addCustomerCart,
  addCustomerWishlist,
  removeCustomerWishlist,
} from "./redux/actions/customer";
import { useDispatch, useSelector } from "react-redux";
import Ship from "./components/ShippingForm";

const Productdetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [details, setDetails] = useState(false);
  const cartData = useSelector(
    (state) => (state && state?.cart && state?.cart?.cartItems) || []
  );
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    description: "",
    unit_price: "",
    quantity: 10,
    attributes: [],
    category: "",
    subcategory: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleHeartClick = async () => {
    try {
      setLoading(true);
      if (isHeartFilled) {
        await dispatch(
          removeCustomerWishlist({
            data: "",
            product_id: productData?.id,
          })
        );
        setIsHeartFilled(false);
      } else {
        await dispatch(
          addCustomerWishlist({
            data: "",
            product_id: productData?.id,
          })
        );
        setIsHeartFilled(true);
      }
    } catch (error) {
      console.error("unable to add wishlist");
    } finally {
      setLoading(false);
    }
  };
  const goToCheckout = () => {
    navigate(`/checkout?type=product&id=${id}`);
  };
  const showDetails = () => setDetails(!details);

  //Add to cart

  const addToCart = (id) => {
    dispatch(
      addCustomerCart({
        data: { quantity: 1 },
        product_id: id,
        productData,
        cartData,
      })
    )
      .then((data) => {
        if (data?.status === 200) {
          toast.success(
            `${
              productData && "name" in productData
                ? productData?.name
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

  // fetching product data
  useEffect(() => {
    if (id) {
      getProductDetails({ product_id: id })
        .then((data) => {
          setProductData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(`Error from Fetching products: ${error}`);
          setLoading(false);
        });
    }
  }, [id]);

  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (newImage) => {
    setSelectedImage(newImage);
  };

  useEffect(() => {
    setSelectedImage(productData ? media + productData?.image : "");
  }, [productData]);

  return (
    <div className="">
      {loading ? (
        <Spinner />
      ) : (
        <div className="content flex flex-wrap">
          <div className="w-full sm:w-1/2">
            <div className="mainImage relative px-6 flex justify-center my-4">
              <img
                className="w-full md:w-2/3 h-auto rounded-lg shadow-md"
                alt=""
                src={selectedImage}
              />
              <div className="bg-black rounded-full p-2 absolute top-1 right-4 sm:right-8">
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
                        className="w-6 h-6 text-red-500"
                        fill="red"
                        onMouseOver={(e) => (e.target.fill = "black")}
                      />
                    ) : (
                      <AiOutlineHeart className="w-6 h-6 text-white" />
                    )}
                  </div>
                </IconContext.Provider>
              </div>
            </div>
            <div className="flex my-3 space-x-5 px-6 flex-wrap">
              <img
                className="w-72 h-72 sm:h-40 sm:w-40 cursor-pointer hover:opacity-80"
                alt=""
                src={productData ? media + productData?.image : ""}
                onClick={() =>
                  handleImageClick(
                    productData ? media + productData?.image : ""
                  )
                }
              />
              <img
                className="w-72 h-72 sm:h-40 sm:w-40 cursor-pointer hover:opacity-80"
                alt=""
                src={
                  "https://m.media-amazon.com/images/I/71ZP6U9sWTL._SX679_.jpg"
                }
                onClick={() =>
                  handleImageClick(
                    "https://m.media-amazon.com/images/I/71ZP6U9sWTL._SX679_.jpg"
                  )
                }
              />
              <img
                className="w-72 h-72 sm:h-40 sm:w-40 cursor-pointer hover:opacity-80"
                alt=""
                src={
                  "https://m.media-amazon.com/images/I/61nCk+BM4-L._SX679_.jpg"
                }
                onClick={() =>
                  handleImageClick(
                    "https://m.media-amazon.com/images/I/61nCk+BM4-L._SX679_.jpg"
                  )
                }
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 mt-6 sm:mt-0 px-8 md:px-0">
            <div className="md:col-span-4 md:ml-8 my-4">
              <div className="text-3xl font-medium text-gray-800 mb-4">
                {`${productData?.name || "Radiant Glow Serum"}`}
              </div>
              <div className="text-gray-600 md:w-[80%]">
                {`${
                  productData?.description
                    ? details
                      ? productData?.description
                      : productData?.description.slice(0, 350) + "..."
                    : `Experience a radiant transformation with our Radiant Glow Serum.
            Infused with a powerful blendMore of nourishing botanicals and potent
            antioxidants, this serum deeply hydrates and revitalizes your skin,
            leaving it with a luminous, youthful glow.`
                }`}
              </div>
              <div
                className="text-blue-600 cursor-pointer flex flex-wrap items-center"
                onClick={showDetails}
              >
                {details ? (
                  <p className="">Show less&#11014;</p>
                ) : (
                  <p className="">More&#11015;</p>
                )}
              </div>
              <div className="my-3">
                <div className="text-xl font-medium text-gray-800">
                  <span className="text-gray-600">Price: </span>$
                  {productData?.unit_price}
                </div>
                <div className="flex items-center w-[50%] justify-between my-5 flex-wrap">
                  {/* <Link href={`/checkout?type=product&id=${id}`}> */}
                  <button
                    onClick={goToCheckout}
                    className="bg-black text-white text-center rounded-lg py-3 w-52"
                  >
                    Buy Now
                  </button>
                  {/* </Link> */}
                  <button
                    onClick={() => addToCart(id)}
                    className="bg-gray-200 text-gray-800 text-center rounded-lg py-3 w-52 flex items-center justify-center"
                  >
                    <AiOutlineShoppingCart className="w-6 h-6" />
                    <span className="ml-3">Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-7 mt-12 text-black px-5 text-2xl mb-3">
            Products you may like
          </div>
          <div className="relative flex flex-row flex-wrap max-w-screen gap-8 px-5">
            <div className="w-80 h-80 relative object-cover flex">
              <img
                className="w-full h-full"
                src="/auth_images/signup1.png"
                alt=""
              />
              <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
            </div>
            <div className="w-80 h-80 relative object-cover flex">
              <img
                className="w-full h-full"
                src="/auth_images/signup1.png"
                alt=""
              />
              <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
            </div>
            <div className="w-80 h-80 relative object-cover flex">
              <img
                className="w-full h-full"
                src="/auth_images/signup1.png"
                alt=""
              />
              <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
            </div>
            <div className="w-80 h-80 relative object-cover flex">
              <img
                className="w-full h-full"
                src="/auth_images/signup1.png"
                alt=""
              />
              <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
            </div>
            <div className="w-80 h-80 relative object-cover flex">
              <img
                className="w-full h-full"
                src="/auth_images/signup1.png"
                alt=""
              />
              <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
            </div>
            <div className="w-80 h-80 relative object-cover flex">
              <img
                className="w-full h-full"
                src="/auth_images/signup1.png"
                alt=""
              />
              <AiOutlineHeart className="absolute bottom-[20px] right-[20px] w-[22px] h-[22px]"></AiOutlineHeart>
            </div>
          </div>
          <div className=" mt-[40px] flex gap-8 justify-between flex-col lg:items-center lg:flex-row items-start ml-4 mb-8 px-5">
            <div className="flex flex-col my-5 md:my-0">
              <div className=" font-light text-black text-2xl flex  w-[370px]">
                Rate this product
              </div>

              <div className=" text-17xl font-medium flex items-center w-[360px] h-14 text-black">{`Ratings `}</div>
              <div className="flex h-12 items-start text-black ">
                <AiFillStar className="w-12 h-12" />
                <AiFillStar className="w-12 h-12" />
                <AiFillStar className="w-12 h-12" />
                <AiFillStar className="w-12 h-12" />
                <AiFillStar className="w-12 h-12" />
              </div>
              <div className=" font-light text-black flex items-center w-[374px] h-[42px]">
                4.8/5 based on 500+ customer reviews
              </div>
            </div>
            <div className="flex flex-col items-start h-[350px] space-y-3">
              <div className=" text-xl font-medium w-[360px] text-black">
                Reviews
              </div>

              <div className="text-inherit font-light font-inherit flex w-[651px] text-black">
                <ul
                  className="sm:px-[10px]  md:px-[27px] w-screen sm:mx-2 md:mx-8 text-black space-y-3"
                  style={{ listStyle: "square" }}
                >
                  <li className="mb-0">
                    &quot;This serum is a game-changer! My skin feels incredibly
                    hydrated and looks so radiant. It has improved my complexion
                    and reduced the appearance of fine lines.&quot; - Emily S.
                  </li>
                  <li className="mb-0">
                    &quot;I&apos;ve tried many serums, but this one truly
                    delivers. My skin feels smoother, more plump, and has a
                    healthy glow. It&apos;s a staple in my skincare routine
                    now.&quot; - James P.
                  </li>
                  <li>
                    &quot;The Radiant Glow Serum has transformed my skin. I
                    struggled with dullness and uneven texture, but after using
                    this serum, my complexion has never looked better. Highly
                    recommended!&quot; - Sarah L.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productdetails;
