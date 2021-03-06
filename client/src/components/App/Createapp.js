import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { authContext } from "../../context/autentication/authContext";

const Createapp = ({ SetCreateApp, SetApps }) => {
  const { logged, SetMyapps } = useContext(authContext);

  const [newApp, SetnewApp] = useState({ UserId: logged.data._id });

  const handlerform = (e) => {
    SetnewApp({ ...newApp, [e.target.name]: e.target.value });
  };

  const styles = {
    TextField: {
      marginBottom: "1rem",
    },
  };

  const btnCreateApp = (e) => {
    e.preventDefault();
    axios
      .post(`/api/app`, newApp)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Aplicación creada",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al crear la aplicación",
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e,
        });
      });

    axios.get(`/api/countapp/${logged.data._id}`).then((response) => {
      SetMyapps(response.data);
    });
    axios
      .get(`/api/app/owner/${logged.data._id}`)
      .then(function (response) {
        SetApps(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTimeout(() => {
      SetCreateApp(false);
    }, 1000);
  };

  return (
    <div className="create-app">
      <form onSubmit={btnCreateApp}>
        <TextField
          style={styles.TextField}
          fullWidth
          id="AppName"
          label="Nombre de la App"
          variant="filled"
          name="AppName"
          onChange={handlerform}
        />
        <TextField
          style={styles.TextField}
          fullWidth
          id="AppDescription"
          label="Description de la app"
          variant="filled"
          name="AppDescription"
          onChange={handlerform}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Crear App
        </Button>
      </form>
    </div>
  );
};

export default Createapp;
