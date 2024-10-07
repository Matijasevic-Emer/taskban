import React, { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import ColumnWithTasks from "../ColumnWithTasks/ColumnWithTasks";
import TaskLoader from "../TaskLoader/TaskLoader";

const ColumnContainer = ({ boardId, refresh }) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos del tablero
  const fetchBoardData = useCallback(() => {
    setLoading(true);

    const columnsUrl = `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${boardId}`;
    const tasksUrl = `https://taskban-task.netlify.app/.netlify/functions/server/tasks?boardId=${boardId}`;

    Promise.all([fetch(columnsUrl), fetch(tasksUrl)])
      .then(async ([columnsResponse, tasksResponse]) => {
        if (!columnsResponse.ok || !tasksResponse.ok) {
          throw new Error("Error al obtener datos del tablero o tareas");
        }

        const columnsData = await columnsResponse.json();
        const tasksData = await tasksResponse.json();

        setColumns(Array.isArray(columnsData.columns) ? columnsData.columns : []);
        setTasks(Array.isArray(tasksData) ? tasksData : []);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setColumns([]);
        setTasks([]);
      })
      .finally(() => setLoading(false));
  }, [boardId]);

  // Ejecutar la función de obtención de datos al cargar el componente o cuando cambie el boardId o el refresh
  useEffect(() => {
    fetchBoardData();
  }, [boardId, refresh, fetchBoardData]);

  if (loading) {
    return <TaskLoader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 2,
        overflowX: "auto",
        backgroundColor: "#7A5C8C",
        padding: 2,
      }}
    >
      {columns.map((column) => {
        const tasksForColumn = tasks.filter(
          (task) => task.columnId === column.id.toString()
        );

        return (
          <ColumnWithTasks
            key={column.id}
            column={column}
            boardId={boardId}
            tasks={tasksForColumn}
            reloadTasks={fetchBoardData}
          />
        );
      })}
    </Box>
  );
};

export default ColumnContainer;
