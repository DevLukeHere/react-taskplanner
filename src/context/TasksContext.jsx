import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("in_progress");

  const addTask = (title, parentId) => {
    if (parentId) {
      const subtaskParents = tasks.find(
        (task) => task.id === parentId
      ).parent_ids;

      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          title,
          parent_id: parentId,
          parent_ids: [parentId].push(subtaskParents),
          status: "in_progress",
        },
      ]);
    } else {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          title,
          parent_id: parentId,
          parent_ids: [parentId],
          status: "in_progress",
        },
      ]);
    }
  };

  const updateFilterStatus = (status) => {
    setFilterStatus(status);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filterStatus,
        addTask,
        updateFilterStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
