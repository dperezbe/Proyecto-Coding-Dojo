import React, { useContext} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { authContext } from "../../context/autentication/authContext";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #0172a7",
  boxShadow: 24,
  p: 4,
};

const btnsi = { marginLeft: "40px" };

export default function BasicModal({ AppId, AppName }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { logged, SetMysubs } = useContext(authContext);


  const btnsubs = () => {
    const UserId = logged.data._id;

    axios
      .post(`/api/subscriber`, {
        AppId: AppId,
        UserId: UserId,
        AppName: AppName,
      })
      .then((response) => {
        axios
        .get(`/api/countsubs/${logged.data._id}`)
        .then((response) => {
          SetMysubs(response.data);
        })
        .catch((e) => console.log(e));

      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <FavoriteIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-title-confirm">
            <h3>¿Desea suscribirse a la aplicación?</h3>
          </div>
          <div className="btn-sub-container">
            <Button variant="contained" className="btn-sub">
              No
            </Button>
            <Button
              style={btnsi}
              variant="contained"
              className="btn-sub"
              onClick={() => btnsubs()}
            >
              Si
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
