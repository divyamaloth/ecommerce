import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
export function apiClient({
  url,
  data = {},
  method = "",
  headers = {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + accessToken,
  },
  noHeaders,
  ...rest
}) {
  return new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken === "" || accessToken === null) {
      delete axios.defaults.headers.common["Authorization"];
    }

    axios({
      method,
      url,
      headers: {
        ...headers,
      },
      data,
      ...rest,
    })
      .then(async (res) => {
        if (
          res?.response?.status === 401 ||
          res?.data?.message === "Unauthenticated"
        ) {
          // refresh api call
        }
        if (res) {
          resolve(res);
        } else {
          reject(res.data.error);
        }
      })
      .catch(async (err) => {
        reject(err);
      });
  });
}
