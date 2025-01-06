import React from "react";
import { Box, Typography } from "@mui/material";
import { formatDate } from "../utils/dateUtils";

const CalendarHeader = ({ dates }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "200px repeat(32, minmax(120px, 1fr))",
        bgcolor: "grey.200",
      }}
    >
      {/* "Resource" Header */}
      <Box
        sx={{
          bgcolor: "grey.50",
          p: 2,
          position: "sticky",
          left: 0,
          zIndex: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "medium", color: "text.primary" }}
        >
          Resource
        </Typography>
      </Box>

      {/* Dates */}
      {dates.map((date) => (
        <Box
          key={date.toISOString()}
          sx={{
            bgcolor:
              date.getDay() === 0 || date.getDay() === 6
                ? "orange.100"
                : "grey.50",
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: "medium", color: "text.primary" }}
          >
            {date.toLocaleDateString("en-US", { weekday: "short" })}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {formatDate(date)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CalendarHeader;
