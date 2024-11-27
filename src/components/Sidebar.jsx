// Sidebar.js
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, taskCounts }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
      customClass: {
        popup: "w-10/12 max-w-xs md:max-w-lg",
        title: "text-lg md:text-2xl",
        icon: "text-sm md:text-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <div className="w-1/5 bg-gray-800 text-white h-screen p-6 flex flex-col justify-between">
      {/* User Info */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="mt-4 text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-400">{user.email || "user@example.com"}</p>
        </div>

        {/* Calendar */}
        <div className="bg-white/20 rounded-md">
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
              <span>0{taskCounts.all}</span>
            </li>
            <li className="flex justify-between text-green-400">
              <span>Completed:</span>
              <span>0{taskCounts.completed}</span>
            </li>
            <li className="flex justify-between text-red-400">
              <span>To-do:</span>
              <span>0{taskCounts.todo}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-6 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
