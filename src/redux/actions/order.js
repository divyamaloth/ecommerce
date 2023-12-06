import { apiClient } from "../../services/ApiConfig";
import { PATH } from "../../services/apiConstant";
import { HTTP_METHOD } from "../../utils/constant";

export async function cancelOrder({ order_id }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.GET,
    url: PATH.order.cancelOrder(order_id),
  });
  return tempResponse.data;
}

export async function trackOrder({ order_id }) {
  const tempResponse = await apiClient({
    method: HTTP_METHOD.GET,
    url: PATH.order.trackOrder(order_id),
  });
  return tempResponse.data;
}
