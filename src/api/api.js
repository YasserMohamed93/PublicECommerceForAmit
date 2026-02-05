import axios from "axios";

// BackEnd URL
const BASE_URL = "https://dummyjson.com";

// Create New Instance Axios
export const API = axios.create({
  baseURL: BASE_URL,
});
