import React, { useContext } from "react";
import whatsappicon from "../../images/whatsapp.png";
import emailicon from "../../images/email.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { authContext } from "../../context/autentication/authContext";

const MainConfigurations = () => {
  const { logged } = useContext(authContext);
  return (
    <div className="config">
      <div>
        <img src={whatsappicon} label="icon" />
        <TextField
          id="outlined-basic"
          value={logged.data.celular}
          variant="outlined"
          className="confinput"
        />
      </div>
      <div>
        <img src={emailicon} label="icon" />
        <TextField
          id="outlined-basic"
          value={logged.data.email}
          variant="outlined"
          className="confinput"
        />
      </div>
      <Button variant="contained" className="btn-save">
        Guardar Configuración
      </Button>
    </div>
  );
};

export default MainConfigurations;
