import React, { useCallback, useEffect } from "react";
import Client from "./Client";
import Admin from "./Admin";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../redux/actions/auth.actions";
import { getToken } from "../redux/localstorage/index";
import { Skeleton } from "antd";

const Dashboard = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const profile = useCallback(() => {
    // const token = getToken();

    dispatch(fetchProfile());
  }, [dispatch, fetchProfile]);
  console.log(authState.role);

  useEffect(() => {
    profile();
  }, [profile]);

  return authState.role === "admin" ? (
    <Admin />
  ) : authState.role === "client" ? (
    <Client />
  ) : (
    <Skeleton />
  );
};
export default Dashboard;
