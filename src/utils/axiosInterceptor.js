import axios from "axios";
export var axiosInstance = axios.create({
  baseURL: "https://real-time-tables.herokuapp.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
