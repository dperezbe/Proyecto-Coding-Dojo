import React from "react";
import Tab from "@mui/material/Tab";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import TravelExploreSharpIcon from "@mui/icons-material/TravelExploreSharp";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Menu = () => {

  //let navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);

  const logout = () =>{
    sessionStorage.removeItem("USER_DATA");
    removeCookie("usertoken");
    //navigate(`/`);
  };

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} className="sep-right">
        <div className="menu">
          <ul>
            <li className="sep-home">
              <a href="/">
                <Tab
                  icon={
                    <HomeSharpIcon
                      sx={{ fontSize: 27 }}
                      style={{ padding: "0" }}
                    />
                  }
                />
              </a>
            </li>
            <li>
              <a href="/apps">
                <Tab icon={<BlurOnIcon sx={{ fontSize: 27 }} />} />
              </a>
            </li>
            <li>
              <a href="#">
                <Tab icon={<TravelExploreSharpIcon sx={{ fontSize: 27 }} />} />{" "}
              </a>
            </li>
            <li>
              <a href="/notifications">
                <Tab icon={<NotificationsSharpIcon sx={{ fontSize: 27 }} />} />
              </a>
            </li>
            <li>
              <a href="#">
                <Tab icon={<SettingsIcon sx={{ fontSize: 27 }} />} />
              </a>
            </li>
            <li className="logout">
              <a href="#">
                <Tab icon={<LogoutIcon sx={{ fontSize: 27 }} />}  onClick={() => logout()}/>
              </a>
            </li>
          </ul>
        </div>
      </Grid>
    </Grid>
  );
};

export default Menu;
