import { apiClient } from "../../services/ApiConfig";
import { PATH } from "../../services/apiConstant";
import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  CART_ITEMS,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  WISHLIST_ITEMS,
} from "../../services/types";
import { HTTP_METHOD } from "../../utils/constant";

export const addCustomerCart =
  ({ data, product_id, productData, cartData }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      apiClient({
        method: HTTP_METHOD.POST,
        url: PATH.customer.addCart(product_id),
        data,
      })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const removeCustomerCart =
  ({ data, product_id }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      apiClient({
        method: HTTP_METHOD.POST,
        url: PATH.customer.removeCart(product_id),
        data,
      })
        .then((response) => {
          resolve(response?.data);
          dispatch({
            type: REMOVE_FROM_CART,
            payload: product_id,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
export const addProduct =
  ({ data }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      apiClient({
        method: HTTP_METHOD.POST,
        url: PATH.customer.createOrder,
        data,
      })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const viewCustomerCart = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: HTTP_METHOD.GET,
      url: PATH.customer.viewCart,
    })
      .then((response) => {
        resolve(response?.data);
        dispatch({
          type: CART_ITEMS,
          payload: response?.data || [],
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addCustomerWishlist =
  ({ data = {}, product_id, productData }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      apiClient({
        method: HTTP_METHOD.POST,
        url: PATH.customer.addWishlist(product_id),
        data,
      })
        .then((response) => {
          resolve(response?.data);
          dispatch({
            type: ADD_TO_WISHLIST,
            payload: productData,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const removeCustomerWishlist =
  ({ data = {}, product_id }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      apiClient({
        method: HTTP_METHOD.POST,
        url: PATH.customer.removeWishlist(product_id),
        data,
      })
        .then((response) => {
          resolve(response?.data);
          dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: product_id,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
export const addAddress =
  ({ data = {} }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      apiClient({
        method: HTTP_METHOD.POST,
        url: PATH.customer.addAddress,
        data,
      })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
export const getAddressList = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: HTTP_METHOD.GET,
      url: PATH.customer.addAddress,
    })
      .then((response) => {
        resolve(response?.data);
        dispatch({
          type: WISHLIST_ITEMS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const viewCustomerWishlist = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: HTTP_METHOD.GET,
      url: PATH.customer.viewWishlist,
    })
      .then((response) => {
        resolve(response?.data);
        dispatch({
          type: WISHLIST_ITEMS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export async function viewCustomerProfile() {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.GET,
    url: PATH.customer.profile,
  });
  return tempResponse.data;
}
