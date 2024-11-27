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

const Home = () => {
  const [userData, setUserData] = useState(null);

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
  const [delteTask] = useDeleteTaskMutation();
  const [toggleTask] = useToggleTaskMutation();
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  console.log(todos);

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
    console.log(`Delete todo with id: ${id}`);
    await delteTask(id);
    await refetch();
  };

  const handleCheck = async (id) => {
    console.log(`Check todo with id: ${id}`);
    await toggleTask(id);
    await refetch();
  };

  const handleAddTodo = (todoText) => {
    const newTodo = {
      id: todos.length + 1,
      text: todoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setOpen(false); // Close modal after adding
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <div
      className="flex min-w-screen min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/28594070/pexels-photo-28594070/free-photo-of-stunning-sunset-over-the-aegean-sea-in-balikesir.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      }}
    >
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> */}

      <Sidebar user={user} taskCounts={taskCounts} />
      <div className="w-full p-12 flex flex-col items-center relative z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="flex justify-between w-full mb-6">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            To-Do List
          </h1>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            startIcon={
              <span className="material-symbols-outlined">add_circle</span>
            }
          >
            Add New Todo
          </Button>
        </div>

        {/* Todo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className={`p-4 rounded-lg opacity-95 shadow-lg flex flex-col items-start cursor-pointer ${
                todo.completed ? "bg-green-100" : "bg-white"
              }`}
              // onClick={() => handleCheck(todo.id)}
            >
              <div className="flex justify-between w-full">
                <div className="flex flex-col items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheck(todo.id)}
                    className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    } text-lg`}
                  >
                    {todo.task}
                  </span>
                  <span>{todo.date}</span>
                  <span>{todo.time}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(todo.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding a new todo */}
      {/* <TodoModal
        open={open}
        handleClose={handleModalClose}
        handleAddTodo={handleAddTodo}
        userId={userId}
      /> */}

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
