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

export default function BasicList() {
  const [apps, SetApps] = useState([]);
  const [createApp, SetCreateApp] = useState(false);
  const [hidelistSus, SethidelistSus] = useState(false);
  const [hidelistApp, SethidelistApp] = useState(false);
  const [hideApps, SethideApps] = useState(false);
  const [mysubs, SetMysubs] = useState([]);

  let navigate = useNavigate();
  const { logged } = useContext(authContext);

  useEffect(() => {
    axios
      .get(`/api/app/owner/${logged.data._id}`)
      .then(function (response) {
        SetApps(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/subscriber/${logged.data._id}`)
      .then(function (response) {
        SetMysubs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const clickapp = (id) => {
    navigate(`/apps/` + id);
  };

  const ListApps = apps.map((app) => (
    <ListItem disablePadding key={app._id}>
      <ListItemButton onClick={() => clickapp(app._id)}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={app.AppName} />
      </ListItemButton>
    </ListItem>
  ));
  const ListSubs = mysubs.map((app) => (
    <ListItem disablePadding key={app._id}>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={app.AppName} />
      </ListItemButton>
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
        <Createapp SetCreateApp={SetCreateApp}  SetApps = {SetApps}/>
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
