import React from "react";
import Grid from "@mui/material/Grid";
import Menu from "../LayoutPanel/Menu";
import MainPanel from "../LayoutPanel/MainPanel";

const Layout = () => {
  return (
    <div className="layout">
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={1}>
          <Menu />
        </Grid>
        <Grid item xs={11} className="main-panel">
          <MainPanel />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
