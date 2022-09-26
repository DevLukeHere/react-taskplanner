import { createContext, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, parentId) => {
    setTasks([...tasks, { title, parentId, id: uuidv4() }]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};

// export const tasksReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_TASKS":
//       return {
//         tasks: action.payload,
//       };
//     case "CREATE_TASKS":
//       return { tasks: [action.payload, ...state.tasks] };
//     case "DELETE_TASK":
//       return {
//         tasks: state.tasks.filter((task) => task.id !== action.payload.id),
//       };
//     default:
//       return state;
//   }
// };

// export const TasksContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(tasksReducer, { tasks: null });

//   return (
//     <TasksContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </TasksContext.Provider>
//   );
// };
