import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

export default function Logout() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return <span onClick={logout}>Logout</span>;
}
