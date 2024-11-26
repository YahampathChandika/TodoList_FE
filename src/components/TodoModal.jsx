// TodoModal.js
import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const TodoModal = ({ open, handleClose, handleAddTodo }) => {
  const [todoText, setTodoText] = useState("");

  const handleSubmit = () => {
    if (todoText.trim() !== "") {
      handleAddTodo(todoText);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="flex flex-col items-center justify-evenly"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 650,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 24,
          px: 4,
          py: 5,
          height: "30vh",
          maxHeight: "60vh",
          overflowY: "hidden",
          outline: "none",
          "@media (max-width: 768px)": { width: "90%", px: 2, py: 4 },
          "@media (max-width: 480px)": { width: "95%", px: 2, py: 4 },
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Todo
        </h2>
        <TextField
          label="Todo Text"
          variant="outlined"
          fullWidth
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="mb-4"
        />
        <div className="flex space-x-4 mt-5 w-full">
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            className="w-full h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className="w-full h-10"
          >
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default TodoModal;
