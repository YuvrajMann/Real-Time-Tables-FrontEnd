import axios from "axios";
export var axiosInstance = axios.create({
  baseURL: "https://floating-cove-15620.herokuapp.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
