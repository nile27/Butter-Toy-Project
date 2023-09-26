import axios from "axios";
import { getCookie, setCookie } from "./cookis";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const token = getCookie("accessToken");
  config.headers["Authorization"] = `${"Bearer " + token}`;
  return config;
});

api.interceptors.response.use(
  function (res) {
    return res;
  },
  async (error) => {
    if (error.config && error.response.status === 401) {
      error.config._retry = true;
      const refreshtoken = getCookie("refreshToken");
      const acesstoken = getCookie("accessToken");
      return axios
        .post(`/api/v1/assignment/reissue`, {
          headers: {
            Authorization: `${"Bearer " + acesstoken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
          accessToken: `${"Bearer " + acesstoken}`,
          refreshToken: `${"Bearer " + refreshtoken}`,
        })
        .then(async (res) => {
          if (res.status === 200 && res.data.accessToken) {
            setCookie("accessToken", res.data.accessToken);
            const accesstoken = getCookie("Authorization");
            console.log("완료");
            error.config.headers["Authorization"] = `${
              "Bearer " + accesstoken
            }`;
            return api(error.config);
          }
        });
    }
    return Promise.reject(error);
  }
);

export { api };
