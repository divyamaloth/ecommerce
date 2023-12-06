// eslint-disable-next-line no-undef

export const API_ENDPOINT = "https://ecommerce.pinksurfing.com/api";
export const API_ENDPOINT_BASE = "https://ecommerce.pinksurfing.com";
// export const API_ENDPOINT = process.env.REACT_APP_URL;

export const PATH = {
  customer: {
    addCart: (product_id) => `${API_ENDPOINT}/customer/cart/add/${product_id}/`,
    removeCart: (product_id) =>
      `${API_ENDPOINT}/customer/cart/remove/${product_id}/`,
    viewCart: `${API_ENDPOINT}/customer/cart/view/`,
    createAccount: `${API_ENDPOINT}/customer/create-account/`,
    createOrder: `${API_ENDPOINT}/customer/create-order/`,
    profile: `${API_ENDPOINT}/customer/profile/`,
    addWishlist: (product_id) =>
      `${API_ENDPOINT}/customer/wishlist/add/${product_id}`,
    removeWishlist: (product_id) =>
      `${API_ENDPOINT}/customer/wishlist/remove/${product_id}`,
    viewWishlist: `${API_ENDPOINT}/customer/wishlist/view/`,
    addAddress: `${API_ENDPOINT}/customer/address/`,
  },
  order: {
    cancelOrder: (order_id) =>
      `${API_ENDPOINT}/order/cancel-order/${order_id}/`,
    trackOrder: (order_id) => `${API_ENDPOINT}/order/track-order/${order_id}/`,
  },
  product: {
    addProducts: `${API_ENDPOINT}/product/add-product/`,
    getAllProducts: `${API_ENDPOINT}/product/all-products/`,
    categories: `${API_ENDPOINT}/product/categories/`,
    deleteProduct: (product_id) =>
      `${API_ENDPOINT}/product/delete-product/${product_id}/`,
    filterProduct: ({ subcategories }) =>
      `${API_ENDPOINT}/product/filter-products/?subcategories=${subcategories}`,
    getProduct: (product_id) =>
      `${API_ENDPOINT}/product/product/${product_id}/`,
    subcategories: (category) => `${API_ENDPOINT}/product/subcategories`,
    vendorProducts: (vendor_id) =>
      `${API_ENDPOINT}/product/vendor-products/${vendor_id}/`,
  },
  auth: {
    token: `${API_ENDPOINT}/token/`,
    refreshToken: `${API_ENDPOINT}/token/refresh/`,
  },
};
