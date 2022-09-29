import React, { useState } from "react";
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
  const { dispatch, addTask } = useTasksContext();
  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setParentId("");
  };

  const handleSubmit = () => {
    // const task = {
    //   id: parentId,
    //   title: title,
    // };

    addTask(title, parentId);

    setTitle("");
    setParentId("");
    setOpen(false);
    // dispatch({ type: "CREATE_TASKS", payload: task });
  };

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
