import { baseURL } from "./index";
import { getToken } from "../redux/localstorage/index";

export const loginAdmin = (data) => baseURL.post("/auth/login", data);

export const loadProfile = () =>
  baseURL.get("/auth/my-profile", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const usersList = () =>
  baseURL.get("/admin/all-users", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const dashboardCounts = () =>
  baseURL.get("/admin/count", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const signUp = (data) => baseURL.post("/auth/signup", data);

export const addMacAddress = (macAddress, btnName, btnState) =>
  baseURL.post(
    "/macAddress/add",
    { macAddress, btnName, btnState },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const updateBtnState = (btnName, btnState) =>
  baseURL.patch(
    "/macAddress/updateBtnState",
    { btnName, btnState },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const getAllMacAdresses = () =>
  baseURL.get("/macAddress/all", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const getDataByMacAddress = (macAddress) =>
  baseURL.post(
    "/mqtt/data",
    { macAddress },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const removeMacaddress = (macAddress) =>
  baseURL.patch(
    "/macAddress/remove",
    { macAddress },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const getAllUsersMacaddress = () =>
  baseURL.get("/admin/all-macAddress", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const getAllUsersMqttData = () =>
  baseURL.get("/admin/all-mqttData", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const publishToMqtt = (macAddress, message) =>
  baseURL.post(
    `/mqtt/publish/${macAddress}`,
    { message },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const uploadOtaFile = (file) =>
  baseURL.post("/admin/ota/upload", file, {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const getAllFiles = () =>
  baseURL.get("/admin/ota", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const deleteOtaFile = async (Key) => {
  console.log(getToken());
  return await baseURL.delete(`/admin/ota/delete/${Key}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
