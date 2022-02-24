import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/layouts/Layout";
import MainAccess from "./components/Access/MainAccess";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContextProvider from './context/autentication/authContext';
import AppMain from "./components/LayoutPanel/AppMain";

function App() {
  // const [user, SetUser] = useState(false);
  // const [authenticate, SetAuthenticate] = useState(false);

  // useEffect(() => {
  //   console.log("autenticado ",authenticate);
  //   if (!authenticate) {
  //     console.log("nooo");
  //     axios
  //       .get("/api/user")
  //       .then(function (response) {
  //         SetUser(response.data.data);
  //         SetAuthenticate(true);
  //         //console.log(response.data.data)
  //         localStorage.setItem('auth', true);
  //         //localStorage.setItem('username', response.data.data.username);
  //         //localStorage.setItem('email', response.data.data.email);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  //   else{
  //     console.log("siii");
  //   }
  // }, [logged]);

  return (
    <AuthContextProvider>
      <AppMain />
    </AuthContextProvider>
  );
}

export default App;
