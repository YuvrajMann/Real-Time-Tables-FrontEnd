import axios from "axios";
export var axiosInstance = axios.create({
  baseURL: "https://localhost:3433/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
