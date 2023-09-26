import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(function (config) {
//   config.headers["accessToken"] = window.sessionStorage.getItem("accessToken");
//   return config;
// });

// api.interceptors.request.use(function (config) {
//   config.headers["refreshToken"] =
//     window.sessionStorage.getItem("refreshToken");
//   return config;
// });

// api.interceptors.request.use(function (config) {
//   config.headers["bearer"] = window.sessionStorage.getItem("bearer");
//   return config;
// });

export { api };
