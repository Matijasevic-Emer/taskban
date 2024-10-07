import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

const TaskList = ({ tasks }) => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 600, // Ajuste opcional para limitar el ancho en pantallas grandes
        margin: "0 auto", // Centrar en la pantalla
      }}
    >
      <Typography variant="h4" gutterBottom>
        Tareas
      </Typography>
      {tasks.length > 0 ? (
        <List>
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItem alignItems="flex-start">
                <Box>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2">{task.description}</Typography>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No tienes tareas asignadas.</Typography>
      )}
    </Box>
  );
};

export default TaskList;
