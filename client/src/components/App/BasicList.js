import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Createapp from "./Createapp";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/autentication/authContext";
import Button from '@mui/material/Button';
import Swal from "sweetalert2";

export default function BasicList() {
  const [apps, SetApps] = useState([]);
  const [createApp, SetCreateApp] = useState(false);
  const [hidelistSus, SethidelistSus] = useState(false);
  const [hidelistApp, SethidelistApp] = useState(false);
  const [hideApps, SethideApps] = useState(false);
  const [subs, Setsubs] = useState([]);

  let navigate = useNavigate();
  const { logged } = useContext(authContext);

  useEffect(() => {
    fnapp();
  }, []);

  useEffect(() => {
    fnmysubs();
  }, []);

  const fnapp = () => {
    axios
    .get(`/api/app/owner/${logged.data._id}`)
    .then(function (response) {
      SetApps(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  const fnmysubs = () =>{
    axios
    .get(`/api/subscriber/${logged.data._id}`)
    .then(function (response) {
      Setsubs(response.data);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const unsubscribe = (app) =>{
    axios
      .delete(`/api/suscriber/${app}`)
      .then(function (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Suscripción eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
        fnmysubs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  const clickapp = (id) => {
    navigate(`/apps/` + id);
  };

  const delapp = (app) =>{
    console.log("borrar app");
    axios
    .delete(`/api/app/${app}`)
    .then(function (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Aplicación eliminada",
        showConfirmButton: false,
        timer: 1500,
      });
      fnapp();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const ListApps = apps.map((app) => (
    <ListItem disablePadding key={app._id}>
      <ListItemButton onClick={() => clickapp(app._id)}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={app.AppName} />
      </ListItemButton>
      <Button variant="contained" color="error"  onClick={() => delapp(app._id)}>
        Borrar aplicación
      </Button>
    </ListItem>
  ));
  const ListSubs = subs.map((app) => (
    <ListItem disablePadding key={app._id}>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={app.AppName} />
      </ListItemButton>
      <Button variant="contained" color="error"  onClick={() => unsubscribe(app._id)}>
        Borrar suscripción
      </Button>
    </ListItem>
  ));
  const handleadd = () => {
    SetCreateApp(true);
  };

  const handleplusapps = () => {
    SethidelistSus(!hidelistSus);
  };

  const handleplussub = () => {
    SethidelistApp(!hidelistApp);
    SethideApps(!hideApps);
  };
  return (
    <div>
      {createApp ? (
        <Createapp SetCreateApp={SetCreateApp} SetApps={SetApps} />
      ) : (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          {hidelistSus ? null : (
            <div>
              <h3>Mis Suscripciones</h3>
              <nav aria-label="secondary mailbox folders">
                <List>
                  {hidelistApp ? (
                    <div>{ListSubs}</div>
                  ) : (
                    <div>
                      {ListSubs[0]}
                      {ListSubs[1]}
                      {ListSubs[2]}
                    </div>
                  )}
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleplussub}>
                      <ListItemText primary="Mostrar más"></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider />
            </div>
          )}

          {hideApps ? null : (
            <div>
              <Divider />
              <nav aria-label="main mailbox folders">
                <h3>Mis Apps</h3>

                <List>
                  {hidelistSus ? (
                    <div>{ListApps}</div>
                  ) : (
                    <div>
                      {ListApps[0]}
                      {ListApps[1]}
                      {ListApps[2]}
                    </div>
                  )}

                  <ListItem disablePadding>
                    <ListItemButton onClick={handleplusapps}>
                      <ListItemText primary="Mostrar más"></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>

              <div className="btn-add-app">
                <Fab color="primary" aria-label="add" onClick={handleadd}>
                  <AddIcon />
                </Fab>
              </div>
            </div>
          )}
        </Box>
      )}
    </div>
  );
}
