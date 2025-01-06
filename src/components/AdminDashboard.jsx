import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarHeader from "./CalendarHeader";
import CalendarRow from "./CalendarRow";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { getCalendarDays } from "../utils/dateUtils";
import { employees } from "../data/sampleData";

const AdminDashboard = () => {
  // Calendar functionality
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const startDate = selectedDate;
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1); // Set to next month

  const dates = getCalendarDays(startDate.toISOString(), endDate.toISOString());

  // Filtering based on roles
  const [selectedRoles, setSelectedRoles] = useState("All");

  const roles = ["All", ...new Set(employees.map((e) => e.role))];

  const filteredEmployees =
    selectedRoles === "All"
      ? employees
      : employees.filter(
          (e) =>
            e.role.trim().toLowerCase() === selectedRoles.trim().toLowerCase()
        );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "gray.50", p: 4 }}>
      <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "lg",
            boxShadow: 3,
            p: 4,
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon sx={{ fontSize: 24, color: "blue" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "gray.900" }}
              >
                Resource Calendar
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", color: "gray.600" }}
            >
              <CalendarMonthIcon
                sx={{ fontSize: 20, cursor: "pointer" }}
                onClick={() => setShowDatePicker(!showDatePicker)} // Toggle calendar
              />
              {showDatePicker && (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  inline
                  className="relative border-2 border-gray-300 rounded-xl shadow-lg bg-white p-4 mt-4 w-96 transform transition-all hover:scale-105 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  popperClassName="custom-datepicker-popper"
                  calendarClassName="custom-datepicker-calendar"
                />
              )}
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "medium",
                  color: "gray.900",
                }}
              >
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          </Box>

          {/* Role-based filter functionality */}
          <Box
            sx={{
              padding: 2,
              borderBottom: 1,
              backgroundColor: "gray.100",
              borderRadius: "lg",
              mb: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "medium", marginBottom: 1 }}
            >
              Filter by Role
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={selectedRoles}
                onChange={(e) => setSelectedRoles(e.target.value)}
                label="Role"
                sx={{ backgroundColor: "white", padding: 1, borderRadius: 1 }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Calendar View with enhanced scroll */}
          <Box
            sx={{
              position: "relative",
              overflowX: "auto",
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                minWidth: "100%",
                textAlign: "center",
              }}
            >
              <CalendarHeader dates={dates} />
              {filteredEmployees.map((employee) => (
                <CalendarRow
                  key={employee.id}
                  employee={employee}
                  dates={dates}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
