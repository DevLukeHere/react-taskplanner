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
} from "@mui/material";
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
  const { tasks } = useTasksContext();
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
              <Typography variant="body2" color="text.secondary">
                {task.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
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
                  <FormControlLabel
                    value="done"
                    control={<Radio />}
                    label="Done"
                  />
                </RadioGroup>
              </FormControl>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </CardContent>
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
