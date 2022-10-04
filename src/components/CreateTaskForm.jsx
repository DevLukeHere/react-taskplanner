import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTasksContext } from "../hooks/useTasksContext";

export default function CreateTaskForm() {
  const [open, setOpen] = useState(false);
  const { addTask, tasks } = useTasksContext();
  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState("");
  let taskCounts = {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setParentId("");
  };

  const handleSubmit = () => {
    addTask(title, parentId);

    setTitle("");
    setParentId("");
    setOpen(false);
  };
  
  useEffect(() => {
    tasks.map((task) => {
      return (taskCounts[task.id] = {
        total_subtasks: 0,
        total_subtask_done: 0,
        status: task.status,
      });
    });

    return () => {
      //
    };
  }, [tasks]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
        sx={{ borderRadius: "1.5rem", m: 1 }}
      >
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "1rem" }}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of your task below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="task-name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            required
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="parent-task-id"
            label="Parent Task ID"
            type="text"
            fullWidth
            name="id"
            variant="standard"
            onChange={(e) => setParentId(e.target.value)}
            value={parentId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
