import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Grid from "@mui/material/Grid";

const MainAccess = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="access-logo"></div>
        </Grid>
        <Grid item xs={6}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainAccess;
