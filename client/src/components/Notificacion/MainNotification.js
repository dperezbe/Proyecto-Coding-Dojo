import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../../context/autentication/authContext";

const MainNotification = () => {
  const [notifications, SetNotifications] = useState([]);
  const { logged, SetMysubs } = useContext(authContext);

  useEffect(() => {

    axios
      .get(`/api/subscriber/${logged.data._id}`)
      .then(function (response) {
        return response.data;
      })
      .then( (kt) => {
        kt.map(k => {
          let m1 =[]
          k.Notification.map(t => {
              axios.get(`/api/notification/${t}`)
             .then((response) => {
               m1.push(response.data);
               console.log(m1);
            })
            
            console.log(m1);
          })
        
        })
      }
      )
      .then(async (s) => await console.log(s))
      .catch(function (error) {
        console.log(error);
      });

      
  }, []);

  // useEffect(() => {
  //   let dat=[];
  //   notificationsId.map((id) => {

  //     axios
  //       .get(`/api/notification/${id}`)
  //       .then( (response) => {
  //           dat.push(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });

  //   });
  //   SetNotifications(...notifications, dat);

  // }, [notificationsId]);

  return (
    <div>
      <h1>Main Notification</h1>
    </div>
  );
};

export default MainNotification;
