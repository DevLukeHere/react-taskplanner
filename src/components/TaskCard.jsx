import React, { useState, Fragment } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tooltip,
  Box,
  Divider,
  Chip,
  FormGroup,
  Checkbox,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTasksContext } from "../hooks/useTasksContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TaskCard() {
  const { tasks, subTasks } = useTasksContext();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCopyClick = (id) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <Fragment>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Card sx={{ m: 1, borderRadius: "1rem" }} key={task.id}>
            <CardHeader
              subheader={`id: ${task.id}`}
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
                <Chip
                  sx={{ mb: 1 }}
                  label="in progress"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Done" />
                </FormGroup>
              </Grid2>
              <Typography variant="body2" color="text.secondary">
                {task.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>

            <Divider variant="middle" />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {subTasks.map((subTask) =>
                subTask.parent_id === task.id ? (
                  <Fragment key={subTask.id}>
                    <CardContent>
                      <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Chip
                          sx={{ mb: 1 }}
                          label="in progress"
                          variant="outlined"
                          size="small"
                          color="primary"
                        />
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Done"
                          />
                        </FormGroup>
                      </Grid2>
                      <Typography variant="body2">{subTask.title}</Typography>
                    </CardContent>
                    <Divider variant="middle" />
                  </Fragment>
                ) : null
              )}
            </Collapse>
          </Card>
        ))
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">No task pending at the moment</Typography>
        </Box>
      )}
    </Fragment>
  );
}
