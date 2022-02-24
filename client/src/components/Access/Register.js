import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, SetRegister] = useState({});
  const handlerform = (e) => {
    SetRegister({ ...register, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const styles = {
    TextField: {
      marginBottom: "1rem",
    },
  };
  const btnregistrar = (e) => {
    e.preventDefault();
    axios
      .post(`/api/user`, register)
      .then((response) => {
        if (response.data.error === false) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro exitoso ",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/`);
        }else if(response.data.error === true){
            if(response.data.message.code === 11000){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El usuario ya existe",
                  });
            }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message.message,
              });
            }
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e,
        });
      });
  };

  return (
    <div className="access-login">
      <h4>Register</h4>
      <form onSubmit={btnregistrar}>
        <TextField
          style={styles.TextField}
          fullWidth
          id="username"
          label="Username"
          variant="filled"
          name="username"
          onChange={handlerform}
        />
        <TextField
          style={styles.TextField}
          fullWidth
          id="email"
          label="Email"
          variant="filled"
          name="email"
          onChange={handlerform}
        />
        <TextField
          style={styles.TextField}
          fullWidth
          type="password"
          id="password"
          label="Password"
          variant="filled"
          name="password"
          onChange={handlerform}
        />
        <TextField
          style={styles.TextField}
          fullWidth
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          variant="filled"
          name="confirmPassword"
          onChange={handlerform}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
        <div className="check-register">
        <a href="/">Volver al Login</a>
            </div>
      </form>
    </div>
  );
};

export default Register;
