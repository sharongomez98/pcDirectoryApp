import axios from "axios";
import store from "./store";

export default function axiosSetUp() {
  // point to your API endpoint
  axios.defaults.baseURL = "https://protected-basin-16055.herokuapp.com/";
  
  //axios.defaults.baseURL = "http://localhost:8080/";

  // Add a request interceptor
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      /* const token = store.getters.accessToken;
      config.headers.common["api-version"] = "1";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } */
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      //console.log(response);
      return response;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );
}
