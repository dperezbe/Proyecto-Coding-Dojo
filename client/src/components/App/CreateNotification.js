import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";

const CreateNotification = () => {
  const { id } = useParams();
  const [Listnotification, setListNotification] = useState([]);
  const [AppName, setAppName] = useState();
  const [notification, SetNotification] = useState({ AppId: id, Message: "" });

  useEffect(() => {
    GetAllMenssage();
  }, []);

  const GetAllMenssage = (e) => {
    axios
      .get(`/api/notificationbyapp/${id}`)
      .then((response) => {
        setListNotification(response.data.notification);
        setAppName(response.data.AppName);
      })
      .catch((e) => console.log(e));
  };

  const handlerform = (e) => {
    SetNotification({ ...notification, [e.target.name]: e.target.value });
  };

  const sendNotification = (e) => {
    e.preventDefault();

    if (notification.Message !== "") {
      axios
        .post(`/api/notification`, notification)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Alerta enviada correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          GetAllMenssage();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className="notification-area">
      <u>
        <h2>{AppName}</h2>
      </u>

      <h3>Envie una notificación a sus suscriptores</h3>
      <form onSubmit={sendNotification}>
        <TextareaAutosize
          maxRows={4}
          aria-label="maximum height"
          placeholder="Notificación de 10 caracteres mínimos"
          defaultValue="Escriba su notificación aquí."
          style={{ width: "100%", height: "250px" ,"font-size": "20px"}}
          onChange={handlerform}
          name="Message"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar notificación
        </Button>
      </form>

      <div className="notifications-old">
        {Listnotification.map((n) => (
          <p key={n._id}>
            {n.Message}
            <b> created: {n.createdAt}</b>
          </p>
        ))}
      </div>
    </div>
  );
};

export default CreateNotification;
