import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  FormControlLabel,
  Tooltip,
  Box,
  Chip,
  FormGroup,
  Checkbox,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTasksContext } from "../hooks/useTasksContext";

export default function TaskCard() {
  const { tasks, updateTaskStatus } = useTasksContext();

  const handleCopyClick = (id) => {
    navigator.clipboard.writeText(id);
  };

  const handleChange = (e, id) => {
    const checked = e.target.checked;

    updateTaskStatus(id, checked);
  };

  return (
    <Fragment>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Card sx={{ m: 1, borderRadius: "1rem" }} key={task.id}>
            <CardHeader
              subheader={`ID: ${task.id}`}
              action={
                <Tooltip title="copy task ID">
                  <IconButton
                    onClick={() => {
                      handleCopyClick(task.id);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <Grid2
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid2 container gap={1}>
                  <Typography variant="body1">Task status:</Typography>
                  <Chip
                    sx={{ mb: 1 }}
                    label={task.status}
                    variant="outlined"
                    size="small"
                    color="primary"
                  />
                </Grid2>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={(e) => handleChange(e, task.id)} />
                    }
                    label="Done"
                  />
                </FormGroup>
              </Grid2>
              <Typography variant="body2" color="text.secondary">
                {task.title}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">No tasks at the moment</Typography>
        </Box>
      )}
    </Fragment>
  );
}
