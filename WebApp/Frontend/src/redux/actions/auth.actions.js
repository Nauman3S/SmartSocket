import Swal from "sweetalert2";
import { setAuthToken } from "../../api";
import { loginAdmin, loadProfile } from "../../api/apiFunctions";
import { saveToken, deleteToken } from "../localstorage/index";
import { SIGN_IN, LOAD_PROF, SIGN_OUT } from "../constants";

export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await loginAdmin(data);
      if (response.status === 200) {
        const { token } = response.data;
        saveToken(token);
        setAuthToken(token);

        dispatch({ type: SIGN_IN, payload: response.data });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Authentication Failed !",
        titleText: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
      console.log(error);
    }
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      const res = await loadProfile();
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: LOAD_PROF, payload: res.data.user });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Authentication Failed !",
        titleText: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 2000,
      });
      console.log(error);
      dispatch({ type: SIGN_OUT });
    }
  };
};
export const logoutAdmin = () => {
  console.log("logged out");
  deleteToken();

  return { type: SIGN_OUT };
};
