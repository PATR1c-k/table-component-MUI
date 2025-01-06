import React from "react";
import { Box, Typography } from "@mui/material";
import { isWeekend } from "../utils/dateUtils";

const CalendarRow = ({ employee, dates }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "200px repeat(auto-fit, minmax(60px, 1fr))",
        gap: "1px",
        backgroundColor: "grey.200",
      }}
    >
      {/* Employee Details (Sticky Column) */}
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          position: "sticky",
          left: 0,
          zIndex: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="body1"
          align="left"
          fontWeight="bold"
          color="textPrimary"
        >
          {employee.name}
        </Typography>
        <Typography variant="subtitle2" align="left" color="textSecondary">
          {employee.role}
        </Typography>
      </Box>

      {/* Date Cells */}
      {dates.map((date) => {
        const task = employee.tasks.find(
          (t) => new Date(t.date).toDateString() === date.toDateString()
        );
        const isWeekendDay = isWeekend(date);

        return (
          <Box
            key={date.toISOString()}
            sx={{
              bgcolor: isWeekendDay ? "#fff7ed" : "white",
              p: 2,
              minHeight: "60px",
            }}
          >
            {task && (
              <Box
                sx={{
                  bgcolor: task.status === "completed" ? "#a5d6a7" : "#e6ee9c",
                  color: task.status === "completed" ? "#388e3c" : "#afb42b",
                  fontSize: "0.75rem",
                  p: 0.5,
                  marginInline: 1,
                  borderRadius: 0.75,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="caption2"
                  align="left"
                  color="textSecondary"
                  fontSize="0.9rem"
                  
                >
                  {task.title}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CalendarRow;
