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
    <div className="w-full md:w-1/4 bg-gradient-to-b from-[#001f3f] to-[#3b4a66] text-white md:h-screen p-8 flex flex-col justify-between shadow-lg">
      {/* User Info */}
      <div className="space-y-8 flex flex-col justify-evenly h-full">
        <div className="text-center flex md:flex-col items-center justify-between text-blue-200 md:text-white">
          <div className="flex md:flex-col items-center space-x-2 md:space-x-0">
            <div className="w-10 h-10 md:w-24 md:h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center md:text-3xl md:font-bold shadow-lg">
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </div>
            <h2 className="md:mt-4 md:text-2xl flex font-semibold">
              {user.firstName}
              <span className="hidden md:block ml-2">{user.lastName}</span>
            </h2>
          </div>
          <span
            class="material-symbols-outlined block md:hidden"
            onClick={handleLogout}
          >
            logout
          </span>
          <p className="text-gray-400 mt-2 text-sm md:block hidden">
            {user.email || "user@example.com"}
          </p>
        </div>

        <div className="md:hidden text-center flex flex-col mb-5 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold text-white z-10 mb-2">
            TaskMate
          </h1>
          <span className="text-white z-10">
            Your friendly companion for productivity.
          </span>
        </div>

        {/* Task Summary */}
        <div className="bg-white/10 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Task Summary</h3>
          <ul className="space-y-2 font-medium text-lg">
            <li className="flex justify-between items-center">
              <span className="text-red-400">To-do :</span>
              <span className="text-red-400 font-medium">
                0{taskCounts.todo}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-green-300">Completed :</span>
              <span className="text-green-300 font-medium">
                0{taskCounts.completed}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-200">All Tasks :</span>
              <span className="text-gray-100 font-medium">
                0{taskCounts.all}
              </span>
            </li>
          </ul>
        </div>

        {/* Calendar */}
        <div className="bg-blue-200/70 rounded-lg shadow-md p-4 !w-full hidden md:block">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className="text-black" />
          </LocalizationProvider>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="hidden md:block bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-3 px-4 rounded-lg shadow-md mt-8 w-full text-lg font-semibold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
