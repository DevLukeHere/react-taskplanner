import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import React from "react";

export default function Filters() {
  return (
    <Box>
      <Typography variant="subtitle1">Filter tasks by:</Typography>
      <FormControl>
        <RadioGroup
          sx={{ flexDirection: "row" }}
          aria-labelledby="task-status-group"
          defaultValue="inProgress"
          name="status-buttons-group"
        >
          <FormControlLabel
            value="inProgress"
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
