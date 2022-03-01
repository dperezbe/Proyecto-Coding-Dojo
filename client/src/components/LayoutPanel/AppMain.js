import React, { useContext, useEffect } from "react";
import { authContext } from "../../context/autentication/authContext";
import MainAccess from "../Access/MainAccess";
import Layout from "../layouts/Layout";

const AppMain = () => {
  const { logged, Setlogged } = useContext(authContext);

  if (logged !== null) {
    sessionStorage.setItem("USER_DATA", JSON.stringify(logged));
  }

  useEffect(() => {
    if (sessionStorage.getItem("USER_DATA")) {
      const userData = JSON.parse(sessionStorage.getItem("USER_DATA"));
      Setlogged(userData);
    }
  }, []);

  return (
    <div className="App">{logged !== null ? <Layout /> : <MainAccess />}</div>
  );
};

export default AppMain;
