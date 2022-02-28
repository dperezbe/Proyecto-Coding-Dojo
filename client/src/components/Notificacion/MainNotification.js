import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../../context/autentication/authContext";
import DescriptionAlerts from "./DescriptionAlerts";

const MainNotification = () => {
  const [notifications, SetNotifications] = useState([]);
  const { logged, SetMysubs } = useContext(authContext);

  useEffect(() => {
    axios
      .get(`/api/subscribernoti/${logged.data._id}`)
      .then(function (response) {
        SetNotifications(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ul>
        {notifications.map((t) => (
          <DescriptionAlerts Message ={t.Message} />
        ))}
      </ul>
    </div>
  );
};

export default MainNotification;
