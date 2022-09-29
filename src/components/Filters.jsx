import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import React from "react";
import { useTasksContext } from "../hooks/useTasksContext";

export default function Filters() {
  const { updateFilterStatus } = useTasksContext();

  const handleChange = (e) => {
    const status = e.target.value
    
    updateFilterStatus(status);
  };

  return (
    <Box>
      <Typography variant="subtitle1">Filter tasks by:</Typography>
      <FormControl>
        <RadioGroup
          sx={{ flexDirection: "row" }}
          aria-labelledby="task-status-group"
          defaultValue="in_progress"
          name="status-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value="in_progress"
            control={<Radio />}
            label="In Progress"
          />
          <FormControlLabel value="done" control={<Radio />} label="Done" />
          <FormControlLabel
            value="complete"
            control={<Radio />}
            label="Complete"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
