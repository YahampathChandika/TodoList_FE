import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button, Modal, TextField, Box } from "@mui/material";
import TodoModal from "../components/TodoModal";

const Home = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "https://via.placeholder.com/150",
  };

  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: false },
    { id: 3, text: "Read a book", completed: true },
  ]);

  const [open, setOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const handleEdit = (id) => {
    console.log(`Edit todo with id: ${id}`);
    // Implement edit function here
  };

  const handleDelete = (id) => {
    console.log(`Delete todo with id: ${id}`);
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove todo from state
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
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <Sidebar user={user} />
      <div className="w-full p-12 flex flex-col items-center relative z-10">
        <div className="flex justify-between w-full mb-6">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            To-Do List
          </h1>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            startIcon={
              <span class="material-symbols-outlined">add_circle</span>
            }
          >
            Add New Todo
          </Button>
        </div>

        {/* Todo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`p-4 rounded-lg opacity-95 shadow-lg flex flex-col items-start ${
                todo.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    className="form-checkbox h-5 w-5 text-blue-500"
                    readOnly
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    } text-lg`}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(todo.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding a new todo */}
      <TodoModal
        open={open}
        handleClose={handleModalClose}
        handleAddTodo={handleAddTodo}
      />
    </div>
  );
};

export default Home;
