import React, { useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import {
  useAddTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../store/api/taskApi";

const TodoModal = ({ open, handleClose, userId, taskData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [addTask, { isLoading, error }] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const { refetch } = useGetTasksQuery(userId);

  useEffect(() => {
    if (taskData) {
      reset({
        task: taskData.task,
        date: dayjs(taskData.date), 
        time: dayjs(taskData.time, "HH:mm"),
      });
    } else {
      reset();
    }
  }, [taskData, reset]);

  const onSubmit = async (data) => {
    const taskDetails = {
      userId,
      task: data.task,
      date: data.date.format("YYYY-MM-DD"),
      time: data.time.format("HH:mm"),
    };

    try {
      if (taskData) {
        // Editing an existing task
        await updateTask({ id: taskData.id, updatedData: taskDetails });
        await refetch();
      } else {
        // Adding a new task
        await addTask(taskDetails);
        await refetch();
      }
      handleClose();
    } catch (err) {
      console.error("Failed to save task:", err);
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
          height: "40vh",
          maxHeight: "60vh",
          overflowY: "hidden",
          outline: "none",
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Task Text Field */}
          <Controller
            name="task"
            control={control}
            defaultValue=""
            rules={{ required: "Task is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Task"
                variant="outlined"
                fullWidth
                error={!!errors.task}
                helperText={errors.task ? errors.task.message : ""}
                className="mb-4"
              />
            )}
          />

          {/* Task Date Field */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="date"
              control={control}
              defaultValue={null}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DateField
                  {...field}
                  label="Date"
                  format="YYYY-MM-DD"
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date ? errors.date.message : ""}
                  className="mb-4"
                />
              )}
            />
          </LocalizationProvider>

          {/* Task Time Field */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="time"
              control={control}
              defaultValue={null}
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <TimeField
                  {...field}
                  label="Time"
                  format="HH:mm"
                  fullWidth
                  error={!!errors.time}
                  helperText={errors.time ? errors.time.message : ""}
                  className="mb-4"
                />
              )}
            />
          </LocalizationProvider>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 mb-4">
              Failed to add task. Please try again.
            </p>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 mt-5">
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              className="w-full h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full h-10"
              disabled={isLoading}
            >
              {taskData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TodoModal;
