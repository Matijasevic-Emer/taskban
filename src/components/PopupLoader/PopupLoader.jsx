import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import Loader from "../Loader/Loader"; // Fallback al Loader por defecto

const PopupLoader = ({ open, handleClose, message, customLoader: CustomLoader }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      disableBackdropClick // Deshabilitar cerrar haciendo click fuera del modal
      disableEscapeKeyDown // Deshabilitar cerrar usando la tecla Escape
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        {CustomLoader ? <CustomLoader /> : <Loader />}
        {message && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default PopupLoader;
