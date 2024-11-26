// Sidebar.js
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Sidebar = ({ user }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = React.useState(today);

  // Example task summary data
  const taskSummary = {
    allTasks: 10,
    completedTasks: 4,
    todoTasks: 6,
  };

  return (
    <div className="w-1/5 bg-gray-800 text-white h-screen p-6 flex flex-col justify-between">
      {/* User Info */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="mt-4 text-xl font-semibold">
            {user.name || "User Name"}
          </h2>
          <p className="text-gray-400">{user.email || "user@example.com"}</p>
        </div>

        {/* Calendar */}
        <div className="bg-red-900">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>

        {/* Task Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Task Summary</h3>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>All Tasks:</span>
              <span>{taskSummary.allTasks}</span>
            </li>
            <li className="flex justify-between text-green-400">
              <span>Completed:</span>
              <span>{taskSummary.completedTasks}</span>
            </li>
            <li className="flex justify-between text-red-400">
              <span>To-do:</span>
              <span>{taskSummary.todoTasks}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <button className="bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-6">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
