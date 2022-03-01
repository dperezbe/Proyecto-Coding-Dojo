import React from "react";
import TopPanel from "./TopPanel";
import ClientCard from "./ClientCard";
import Mysubscriptions from "./Mysubscriptions";
import MainApp from "../App/MainApp";
import MainNotification from "../Notificacion/MainNotification";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CreateNotification from "../App/CreateNotification";
import WrapperCard from "../MainPanel/WrapperCard";
import MainConfigurations from "../configurations/MainConfigurations";

const MainPanel = () => {
  return (
    <div>
      <TopPanel />
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={3} className="rigth-panel  menu-panel">
          <ClientCard />
          <Mysubscriptions />
        </Grid>
        <Grid item xs={9} style={{ height: "100%" }} className="nav menu-panel">
          <Router>
            <Routes>
              <Route exact path="/" element={<WrapperCard />} />
              <Route exact path="/apps" element={<MainApp />} />
              <Route exact path="/notifications" element={<MainNotification />} />
              <Route exact path="/apps/:id" element={<CreateNotification />} />
              <Route exact path="/configurations" element={<MainConfigurations />} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPanel;
