import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./taskloader.json";

const TaskLoader = ({ loadingText = "Cargando datos, por favor espera..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        textAlign: "center", // Centrar texto si es necesario
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
        aria-label="Loading animation" // Mejora de accesibilidad
      />
      <CircularProgress color="primary" sx={{ mt: 2 }} aria-label="Loading" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {loadingText}
      </Typography>
    </Box>
  );
};

export default TaskLoader;
