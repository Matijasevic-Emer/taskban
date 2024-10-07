import React from "react";
import {
  Card as MUICard,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getRandomEmoji } from "../../utils/getRandomEmoji";

const BoardCard = ({ board, onDelete, onEdit, onClick }) => {
  const { id, name, description } = board;

  // Estilos comunes para los IconButton
  const iconButtonStyle = {
    color: "primary.main",
    ":hover": { color: "secondary.main" },
    zIndex: 1, // Aseguramos que los botones sigan siendo clickeables
  };

  // Evitar propagación del click en los botones
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <MUICard
      sx={{
        maxWidth: 345,
        m: 2,
        boxShadow: 3,
        cursor: "pointer", // Cambia el cursor al pasar sobre la card
        ":hover": { boxShadow: 6 }, // Aumenta el shadow al hacer hover
      }}
      onClick={onClick} // Toda la card es clickeable
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description + " " + getRandomEmoji()}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <IconButton sx={iconButtonStyle} onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton sx={iconButtonStyle} onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </MUICard>
  );
};

export default BoardCard;