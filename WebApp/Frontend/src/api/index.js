import Axios from "axios";

export const baseURL = Axios.create({
  baseURL: process.env.REACT_APP_API,
  // baseURL: "http://localhost:3500/api",
});

export const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    Axios.defaults.headers.common["x-access-token"] = token;
  } else {
    // Delete auth header
    delete Axios.defaults.headers.common["x-access-token"];
  }
};
