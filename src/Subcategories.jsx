import Search from "./components/Search";
import SmallCards from "./components/SmallCards";
import StoreCarousel from "./components/StoreCarousel";
import { useEffect, useState } from "react";
import { getSubCategories } from "./redux/actions/product";
import SmallCardsTest from "./components/SmallCardsTest";
import Spinner from "./components/Spinner";
import { useSearchParams } from "react-router-dom";

const tempCategoriesDataArray = [
  {
    image: "/electronics.png",
    slug: "electronics",
    name: "Electronics",
  },
  { image: "/breakfast.png", slug: "food", name: "Food" },
  {
    image: "/cars and trucks.png",
    slug: "cars-trucks",
    name: "Cars & Trucks",
  },
  {
    image: "/real Estate.png",
    slug: "real-estate",
    name: "Real Estate",
  },
  {
    image: "/game.gif",
    slug: "video-games",
    name: "Video Games",
  },
  {
    image: "hotel.png",
    slug: "hotels",
    name: "Hotels",
  },
  {
    image: "/acquisition.png",
    slug: "business-4-sale",
    name: "Business 4 sale",
  },
  {
    image: "/computer.png",
    slug: "computer-parts",
    name: "Computer Parts",
  },
  {
    image: "/movies.png",
    slug: "womens-clothing",
    name: "Women's Clothing",
  },
  {
    image: "/cards.gif",
    slug: "mens-clothing",
    name: "Men's Clothing",
  },
  {
    image: "/toy.gif",
    slug: "toys",
    name: "Toys",
  },
];

const Subcategories = () => {
  console.log("asdguashduihukashdk");
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  useEffect(() => {
    setIsLoading(true);
    searchParams.get("category") &&
      getSubCategories({ category: searchParams.get("category") })
        .then((res) => {
          const tempData =
            res &&
            res?.map((el) => {
              return {
                ...el,
                image: el?.image
                  ? el?.image
                  : tempCategoriesDataArray?.find(
                      (item) => item?.slug === el?.slug
                    )?.image,
              };
            });
          setSubCategoriesData(tempData); // replace tempCategoriesDataArray with tempData once get category list
        })
        .catch(() => {
          setSubCategoriesData([]);
        })
        .finally(() => setIsLoading(false));
  }, [searchParams]);

  if (isLoading) {
    return <Spinner />; // Render skeleton loading while data is loading
  }

  return (
    <div>
      {/* <Search /> */}
      <SmallCardsTest categoriesData={subCategoriesData} />
    </div>
  );
};

export default Subcategories;
