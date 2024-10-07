import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./loader.json";

const Loader = () => {
  const loaderStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  };

  const textStyles = {
    mt: 2,
    transition: "opacity 0.3s ease",
  };

  return (
    <Box sx={loaderStyles}>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
        aria-label="Cargando animación"
      />
      <CircularProgress color="primary" sx={{ mt: 2 }} />
      <Typography variant="h6" sx={textStyles}>
        Cargando datos, por favor espera...
      </Typography>
    </Box>
  );
};

export default Loader;
