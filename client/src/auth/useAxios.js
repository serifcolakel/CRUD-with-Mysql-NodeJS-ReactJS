import axios from "axios";
function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem("token");
  return accessToken;
}
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${getLocalAccessToken()}`,
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
