import axios from "axios";
import Cookies from "universal-cookie";
const clearCookies = require("../utils/clearCookies");
const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  const token = cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleError = async (error) => {
  if (error.response && error.response.status === 401) {
    await clearCookies.clearData();
    return { unauthorized: true };
  }
  if (error.response && error.response.status === 404) {
    return { notFound: true };
  }
  return { error: true };
};

export default instance;
