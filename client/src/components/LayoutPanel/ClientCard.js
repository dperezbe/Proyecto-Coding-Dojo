import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { authContext } from "../../context/autentication/authContext";
import axios from "axios";

const ClientCard = () => {
  const { logged, myapps, SetMyapps, mysubs, SetMysubs } =
    useContext(authContext);

  useEffect(() => {
    axios
      .get(`/api/countapp/${logged.data._id}`)
      .then((response) => {
        SetMyapps(response.data);
      })
      .catch((e) => console.log(e));

    axios
      .get(`/api/countsubs/${logged.data._id}`)
      .then((response) => {
        SetMysubs(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div className="client-card">
      <table>
        <tbody>
          <tr>
            <td className="client-avatar">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 80, height: 80 }}
                />
              </StyledBadge>

              <h3>{logged.data.username}</h3>
            </td>
          </tr>
          <tr>
            <td className="card-info">{mysubs} Aplicaciones suscritas</td>
          </tr>
          <tr>
            <td className="card-info"> {myapps} Aplicaciones creadas</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClientCard;
