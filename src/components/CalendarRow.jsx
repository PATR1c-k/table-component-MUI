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
        }}
      >
        <Typography variant="body2" fontWeight="medium" color="text.primary">
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
              bgcolor: isWeekendDay ? "orange.100" : "white",
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
                    task.status === "completed" ? "green.100" : "yellow.100",
                  color:
                    task.status === "completed" ? "green.800" : "yellow.800",
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
