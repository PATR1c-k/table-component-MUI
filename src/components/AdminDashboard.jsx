import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarHeader from "./CalendarHeader";
import CalendarRow from "./CalendarRow";

import { getCalendarDays } from "../utils/dateUtils";
import { employees } from "../data/sampleData";

const AdminDashboard = () => {
  const dates = getCalendarDays("2025-01-02", "2025-02-02");

  return (
    <Box
      sx={{
        minHeight: "10000vh",
        backgroundColor: "grey.50",
        p: 3,
        marginX: "auto",
      }}
    >
      <Box maxWidth="lg" mx="auto">
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <PersonIcon sx={{ fontSize: 30, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="textPrimary">
                Resource Calendar
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color="text.secondary"
            >
              <CalendarMonthIcon fontSize="small" />
              <Typography variant="caption">Jan 2025 - Feb 2025</Typography>
            </Box>
          </Box>

          {/* Calendar View */}
          <Paper
            elevation={1}
            sx={{
              overflowX: "auto",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Box display="inline-block" minWidth="100%" textAlign="center">
              <Box overflow="hidden">
                <CalendarHeader dates={dates} />
                {employees.map((employee) => (
                  <CalendarRow
                    key={employee.id}
                    employee={employee}
                    dates={dates}
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
