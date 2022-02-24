import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {authContext} from '../../context/autentication/authContext';

const Login = () => {
  const {Setlogged} = useContext(authContext);

  const styles = {
    TextField: {
      marginBottom: "1rem",
    },
  };
  const [login, SetLogin] = useState({});
  let navigate = useNavigate();

  const handlerform = (e) => {
    SetLogin({ ...login, [e.target.name]: e.target.value });
  };

  const btnLogin = (e) => {
    e.preventDefault();
    axios
      .post(`/api/login`, login)
      .then((response) => {
        if (response.data.error === false) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login exitoso",
            showConfirmButton: false,
            timer: 1500,
          });
          Setlogged(response.data);
          navigate(`/`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Credenciales erroneas",
          });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="login">
<div className="access-login">
            <h4>Login</h4>
            <form onSubmit={btnLogin}>
              <TextField
                style={styles.TextField}
                fullWidth
                id="emaillogin"
                label="Email"
                variant="filled"
                name="email"
                onChange={handlerform}
              />
              <TextField
                style={styles.TextField}
                fullWidth
                type="password"
                id="passwordlogin"
                label="Password"
                variant="filled"
                name="password"
                onChange={handlerform}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
            <div className="check-login">
            <a>Recuperar contraseña</a>
            <a href="/register">Registrarse</a>
            </div>
  

          </div>
    </div>
  );
};

export default Login;
