import React from "react";
import { Avatar } from "@mui/material";

const UserAvatar = ({ src, size = 40, alt = "User Avatar", fallback = "U" }) => {
  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{ 
        width: size, 
        height: size, 
        borderRadius: "50%", 
        bgcolor: src ? "transparent" : "#757575" // Color de fondo si no hay imagen
      }}
    >
      {!src && fallback} {/* Mostrar fallback si no hay imagen */}
    </Avatar>
  );
};

export default UserAvatar;
