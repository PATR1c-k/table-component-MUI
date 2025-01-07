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
} from "@mui/material";
import DatePicker from "react-datepicker";
import { getCalendarDays } from "../utils/dateUtils";
import { employees } from "../data/sampleData";

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState("All");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const startDate = selectedDate;
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  const dates = getCalendarDays(startDate.toISOString(), endDate.toISOString());

  const roles = ["All", ...new Set(employees.map((e) => e.role))];
  const filteredEmployees =
    selectedRoles === "All"
      ? employees
      : employees.filter(
          (e) =>
            e.role.trim().toLowerCase() === selectedRoles.trim().toLowerCase()
        );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "grey.100", p: 4 }}>
      <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
        <Box
          sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: 3, p: 4 }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon sx={{ fontSize: 30, color: "primary.main" }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", ml: 1, color: "#1c637b" }}
              >
                Resource Calendar
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CalendarMonthIcon
                sx={{ fontSize: 24, cursor: "pointer", color: "primary.main" }}
                onClick={() => setShowDatePicker(!showDatePicker)}
              />
              {showDatePicker && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 10,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "white",
                  }}
                >
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    inline
                    label={'"month" and "year"'}
                    views={["month", "year"]}
                  />
                </Box>
              )}
              <Typography
                sx={{ ml: 1, fontWeight: "bold", color: "text.primary" }}
              >
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          </Box>

          {/* Role-based filter */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid",
              borderColor: "grey.300",
              mb: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", mb: 1, color: "#5499ed" }}
            >
              Filter by Role
            </Typography>
            <br />
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={selectedRoles}
                onChange={(e) => setSelectedRoles(e.target.value)}
                label="Role"
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Calendar */}
          <Box sx={{ overflowX: "auto", boxShadow: 1, borderRadius: 2 }}>
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
