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
              bgcolor: isWeekendDay ? "#f5f2ee" : "white",
              p: 2,
              minHeight: "auto",
            }}
          >
            {task && (
              <Box
                sx={{
                  bgcolor: task.status === "completed" ? "#a5d6a7" : "#e6ee9c",
                  color: task.status === "completed" ? "#2e7531" : "#878a25",
                  p: 0.5,
                  marginInline: 1,
                  borderRadius: 0.75,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  align="center"
                  fontSize="0.6rem"
                  fontWeight="700"
                  sx={{
                    padding: "2px 4px",
                  }}
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
