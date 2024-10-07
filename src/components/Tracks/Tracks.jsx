import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./tracks.json"; // Asegúrate de que la ruta sea correcta
import { Box } from "@mui/material";
import { useEffect } from "react";

const Tracks = () => {
  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Solo desplazar si el contenido es mayor que la altura de la ventana visible
    if (scrollHeight > clientHeight) {
      window.scrollTo({
        top: scrollHeight,
        behavior: "smooth", // Desplazamiento suave
      });
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh", // Se asegura que ocupe un espacio mínimo
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
        aria-label="Tracks animation" // Mejora de accesibilidad
      />
    </Box>
  );
};

export default Tracks;
