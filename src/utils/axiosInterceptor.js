import axios from "axios";
export var axiosInstance = axios.create({
  baseURL: "https://realtimetables.azurewebsites.net/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
