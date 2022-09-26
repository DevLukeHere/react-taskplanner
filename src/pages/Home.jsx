import React from "react";
import { Container, Box, Typography } from "@mui/material";
import TaskCard from "../components/TaskCard";
import Filters from "../components/Filters";
import CreateTaskForm from "../components/CreateTaskForm";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      <Container>
        <Box>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", m: 2, fontWeight: "bold" }}
          >
            Streamframe Task Planner
          </Typography>
        </Box>
        <Box>
          <CreateTaskForm />
          <Filters />
        </Box>
        <Box>
          <TaskCard />
        </Box>
      </Container>
    </Box>
  );
}
