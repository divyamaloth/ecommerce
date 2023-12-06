import { PRODUCTS_LIST } from "../../services/types";

const initialState = {
  productList: [
    {
      id: 243234,
      name: "ali",
      image:
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      description: "dsklfjklsdjfklsjdklfjkl",
      unit_price: 1000,
    },
  ],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
