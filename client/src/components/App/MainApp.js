import React from "react";
import BasicList from "./BasicList";
import Grid from "@mui/material/Grid";

const MainApp = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div className="table-info-apps">
            <BasicList />
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

export default MainApp;
