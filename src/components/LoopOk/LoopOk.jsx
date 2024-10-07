import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getCitasRandom } from "../../utils/getRandomEmoji";

const LoopOk = () => {
  const [cita, setCita] = useState("");

  useEffect(() => {
    const actualizarCita = () => {
      setCita(getCitasRandom());
    };

    // Llamar a la función inmediatamente para mostrar la primera cita
    actualizarCita();

    // Actualizar la cita cada 10 segundos
    const intervalId = setInterval(actualizarCita, 10000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  };

  const typographyStyles = {
    mt: 2,
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    fontStyle: "italic",
    transition: "opacity 0.3s ease", // Transición suave
  };

  return (
    <Box sx={boxStyles}>
      <Typography variant="h6" sx={typographyStyles}>
        {cita || "Cargando una cita inspiradora..."}
      </Typography>
    </Box>
  );
};

export default LoopOk;
