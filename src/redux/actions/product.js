import { apiClient } from "../../services/ApiConfig";
import { PATH } from "../../services/apiConstant";
import { PRODUCTS_LIST } from "../../services/types";
import { HTTP_METHOD } from "../../utils/constant";

export async function addNewProducts({ data, product_id }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.POST,
    url: PATH.product.addProducts,
    data,
  });
  return tempResponse.data;
}

export const viewAllProducts = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: HTTP_METHOD.GET,
      url: PATH.product.getAllProducts,
    })
      .then((response) => {
        resolve(response?.data?.Products);
        dispatch({
          type: PRODUCTS_LIST,
          payload: response?.data?.Products || [],
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export async function getProductCategories() {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.GET,
    url: PATH.product.categories,
  });
  return tempResponse.data;
}
export async function deleteProduct({ product_id }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.DELETE,
    url: PATH.product.deleteProduct(product_id),
  });
  return tempResponse.data;
}

export const filterProducts =
  ({ subcategories }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      apiClient({
        method: HTTP_METHOD.GET,
        url: PATH.product.filterProduct({ subcategories }),
      })
        .then((response) => {
          resolve(response?.data);
          dispatch({
            type: PRODUCTS_LIST,
            payload: response?.data || [],
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export async function getProductDetails({ product_id }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.GET,
    url: PATH.product.getProduct(product_id),
  });
  return tempResponse?.data?.["Products"];
}

export async function getSubCategories({ category }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.GET,
    url: PATH.product.subcategories(category),
  });
  return tempResponse?.data?.filter(
    (item) => item?.category === category?.toLowerCase()
  );
}

export async function vendorDetails({ product_id }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.GET,
    url: PATH.product.vendorProducts(product_id),
  });
  return tempResponse.data;
}

export async function updateVendorDetails({ product_id }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.POST,
    url: PATH.product.vendorProducts(product_id),
  });
  return tempResponse.data;
}
