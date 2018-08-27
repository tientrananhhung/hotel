// import axios from "axios";
window.axios = require("axios");
//
window.axios.defaults.baseURL = "http://hotel.test/api";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// const instance = axios.create({
//   baseURL: "http://hotel.test/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" }
// });
// Add a request interceptor
window.axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log(config);
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
window.axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // console.log("AAA", error.response.status);
    // Do something with response error
    return Promise.reject(error);
  }
);
// export default axios;
