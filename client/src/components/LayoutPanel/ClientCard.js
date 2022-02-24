import React,{useContext} from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { authContext } from "../../context/autentication/authContext";

const ClientCard = () => {

  const { logged } = useContext(authContext);

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
            <td className="card-info">0 Aplicaciones suscritas</td>
          </tr>
          <tr>
            <td className="card-info"> 0 Aplicaciones creadas</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClientCard;
