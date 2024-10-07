import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CardList from "../CardList/CardList";
import PopupCard from "../PopupCard/PopupCard";
import Sim from "../Sim/Sim";

const ColumnWithTasks = ({ boardId, column, tasks, reloadTasks }) => {
  const [popupState, setPopupState] = useState({ open: false, mode: "create" });
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isFail, setIsFail] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Crear nueva tarea
  const handleCreateTask = async (taskDetails) => {
    try {
      const response = await fetch(
        `https://taskban-task.netlify.app/.netlify/functions/server/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: taskDetails.name,
            description: taskDetails.description,
            boardId: boardId,
            columnId: column.id,
            createdUser: "1KfJzumzPqNG1bZumZiE", // Hardcoded user for creation
            createdDate: new Date().toISOString(),
            tutorUser: taskDetails.tutor,
            status: taskDetails.status || "in progress",
            points: taskDetails.points || 0,
            estimatedStartDate: taskDetails.startDate,
            estimatedFinishDate: taskDetails.endDate,
            userAssigned: taskDetails.userAssigned,
            userInvolved: JSON.stringify(taskDetails.involvedUsers),
          }),
        }
      );
      
      if (response.ok) {
        setPopupState({ open: false, mode: "create" });
        setIsFail(false);
        reloadTasks();
      } else {
        throw new Error("Error al crear la tarea");
      }
    } catch (error) {
      console.error(error);
      setIsFail(true);
    }
  };

  // Editar tarea
  const handleEditTask = async (taskId, taskDetails) => {
    try {
      const response = await fetch(
        `https://taskban-task.netlify.app/.netlify/functions/server/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskDetails),
        }
      );
      
      if (response.ok) {
        setPopupState({ open: false, mode: "create" });
        reloadTasks();
      } else {
        throw new Error("Error al editar la tarea");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar tarea
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `https://taskban-task.netlify.app/.netlify/functions/server/tasks/${taskId}`,
        { method: "DELETE" }
      );
      
      if (response.ok) {
        reloadTasks();
      } else {
        throw new Error("Error al eliminar la tarea");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar columna
  const handleDeleteColumn = async () => {
    let board = JSON.parse(localStorage.getItem("boardData"));
    let boardUpdated = JSON.stringify({
      ...board,
      columns: board.columns.filter((col) => col.id !== column.id),
    });
    
    try {
      const response = await fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${boardId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: boardUpdated,
        }
      );
      
      if (response.ok) {
        reloadTasks();
        setConfirmDialogOpen(false);
      } else {
        throw new Error("Error al eliminar la columna");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "300px",
        padding: "8px",
        backgroundColor: "#f9f9f9",
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h6" align="center" gutterBottom>
          {column.name}
          <IconButton
            color="error"
            onClick={() => setConfirmDialogOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
        <IconButton
          color="primary"
          onClick={() => {
            setPopupState({ open: true, mode: "create" });
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {isFail && <Sim isFail={true} />}

      <CardList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={(taskId) => {
          setSelectedTaskId(taskId);
          setPopupState({ open: true, mode: "edit" });
        }}
      />

      <PopupCard
        open={popupState.open}
        onClose={() => {
          setPopupState({ open: false, mode: "create" });
          setSelectedTaskId(null); // Reset selected task
        }}
        itemId={selectedTaskId}
        mode={popupState.mode}
        onCreate={handleCreateTask}
        onEdit={handleEditTask}
      />

      {/* Diálogo de Confirmación para eliminar la columna */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Eliminar Columna</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta columna?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteColumn} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColumnWithTasks;
