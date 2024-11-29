import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "@mui/material";
import TodoModal from "../components/TodoModal";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleTaskMutation,
} from "../store/api/taskApi";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import image from "../assets/images/b2.jpg";
import nodata from "../assets/images/nodata.svg";
import { HashLoader } from "react-spinners";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedData = jwtDecode(token);
        setUserData(decodedData);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const user = {
    firstName: userData?.firstName || "John",
    lastName: userData?.lastName || "Wick",
    email: userData?.email || "john.doe@example.com",
  };

  const userId = userData?.userId;
  const { data: todos, refetch } = useGetTasksQuery(userId);
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTask] = useToggleTaskMutation();
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const calculateTaskCounts = () => {
    const all = todos?.length || 0;
    const completed = todos?.filter((todo) => todo.completed).length || 0;
    const todo = all - completed;
    return { all, completed, todo };
  };

  const taskCounts = calculateTaskCounts();

  const handleEdit = (id) => {
    const selectedTask = todos.find((todo) => todo.id === id);
    if (selectedTask) {
      setEditTask(selectedTask);
      setOpen(true);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      customClass: {
        popup: "w-10/12 max-w-xs md:max-w-lg",
        title: "text-lg md:text-2xl",
        icon: "text-sm md:text-lg",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await deleteTask(id);
          await refetch();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Your task has been deleted.",
          });
        } catch (error) {
          Swal.fire("Error", "Failed to delete the task.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleCheck = async (id) => {
    setLoading(true);
    try {
      await toggleTask(id);
      await refetch();
    } catch (error) {
      console.error("Error toggling task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <div
      className="flex flex-col md:flex-row min-w-screen min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <Sidebar user={user} taskCounts={taskCounts} />
      <div className="w-full p-12 flex flex-col items-center relative z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between w-full mb-10 z-30">
          <div className="hidden md:flex flex-col mb-5 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-white z-10 mb-2">
              TaskMate
            </h1>
            <span className="text-white z-10">
              Your friendly companion for productivity.
            </span>
          </div>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            className="!h-10 !md:h-12 !text-sm !p-4 md:!p-6"
            startIcon={
              <span className="material-symbols-outlined">add_circle</span>
            }
          >
            Add New Task
          </Button>
        </div>

        {/* Todo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 w-full">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className={`p-3 md:p-5 rounded-lg opacity-95 shadow-lg flex flex-col items-start cursor-pointer  ${
                todo.completed ? "bg-green-100" : "bg-white"
              }`}
              onClick={() => handleCheck(todo.id)}
            >
              <div className="w-full flex items-center justify-between">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheck(todo.id)}
                  className="form-checkbox h-4 md:h-6 w-4 md:w-6 !text-green-500 cursor-pointer"
                  disabled={loading} // Disable the checkbox while loading
                />
                <div className="flex my-2 text-sm md:text-lg font-normal">
                  <span>{`${todo.date} | ${todo.time}`}</span>
                </div>
              </div>
              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                } md:text-xl font-medium md:font-semibold my-3`}
              >
                {todo.task}
              </span>
              <div className="flex space-x-2 md:space-x-4 w-full items-center justify-end">
                <button
                  // onClick={() => handleEdit(todo.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(todo.id);
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <span className="material-symbols-outlined text-lg md:text-2xl">
                    edit_square
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo.id);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <span className="material-symbols-outlined text-lg md:text-2xl">
                    delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <HashLoader color="#38bdf8" size={50} />
          </div>
        )}
        {todos?.length === 0 && (
          <div className="md:absolute md:inset-0 flex flex-col items-center justify-center z-20">
            <img
              src={nodata}
              alt="No Data"
              className="w-36 h-36 md:w-80 md:h-80"
            />
            <p className="text-white mt-8 text-xl md:text-2xl font-semibold">
              No tasks available
            </p>
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              Add a new task to get started!
            </p>
          </div>
        )}
      </div>

      <TodoModal
        open={open}
        handleClose={() => {
          setEditTask(null); // Reset editing state
          handleModalClose();
        }}
        userId={userId}
        taskData={editTask}
      />
    </div>
  );
};

export default Home;
