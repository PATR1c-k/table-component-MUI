import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { isWeekend } from "../utils/dateUtils";

const CalendarRow = ({ employee, dates }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "200px repeat(32, minmax(120px, 1fr))",
        bgcolor: "grey.200",
      }}
    >
      {/* Employee Information */}
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          position: "sticky",
          left: 0,
          zIndex: 10,
          boxShadow: 3,
          justifyItems: "left",
        }}
      >
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {employee.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {employee.role}
        </Typography>
      </Box>

      {/* Dates and Tasks */}
      {dates.map((date) => {
        const task = employee.tasks.find(
          (t) => new Date(t.date).toDateString() === date.toDateString()
        );

        const isWeekendDay = isWeekend(date);

        return (
          <Box
            key={date.toISOString()}
            sx={{
              bgcolor: isWeekendDay ? "#f5f2ee" : "white",
              p: 2,
              minHeight: 60,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {task && (
              <Chip
                label={task.title}
                size="small"
                sx={{
                  backgroundColor:
                    task.status === "completed" ? "#aef071" : "#e6ee9c",
                  color: task.status === "completed" ? "#3d603f" : "#a08a25",
                  fontSize: "0.75rem",
                  borderRadius: 1,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CalendarRow;
