import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../../context/autentication/authContext";
import DescriptionAlerts from "./DescriptionAlerts";
import notnot from "../../images/notnot.png";

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
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((t) => (
            <li key={Math.random()}>
              <DescriptionAlerts Message={t?.Message} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="notnoti">
          <h2>Sin notificaciones pendientes</h2>

          <img src={notnot} alt="notnot" />
        </div>
      )}
    </div>
  );
};

export default MainNotification;
