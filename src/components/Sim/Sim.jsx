import React from "react";
import { Box, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./task-person.json";

const Sim = ({ isFail }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%", // Mejor ajuste para contenedores flexibles
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{
          height: "50vh",
          width: "50vh",
          maxWidth: "100%", // Adaptable a pantallas pequeñas
          maxHeight: "50vh",
        }}
        aria-label={isFail ? "Error animation" : "Idle animation"} // Mejora accesibilidad
      />
      <Typography
        variant="h6"
        sx={{ mt: 2, color: isFail ? "error.main" : "text.primary" }}
      >
        {isFail
          ? "Ocurrió un error, intente de nuevo"
          : "Agrega contenido para empezar"}
      </Typography>
    </Box>
  );
};

export default Sim;
