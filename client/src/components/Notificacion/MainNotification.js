import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';

const MainNotification = () => {
    const [apps,SetApps] = useState([]);

    useEffect(() => { 
      axios
      .get("/api/6212f5ec457afbec2679a52e/apps")
      .then(function (response) {
      SetApps(response.data);  
      })
      .catch(function (error) {
        console.log(error);
      });
    }, []);

    const listItems = apps.map((app) =>
      <li key={app._id}>{app.AppName}</li>
    );
    
    return (
        <div>
            <h1>Main Notification</h1>
            <ul>{listItems}</ul>
        </div>
    );
};

export default MainNotification;