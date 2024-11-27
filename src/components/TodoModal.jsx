import React, { useEffect } from "react";
import { Modal, Box, TextField, Button, CircularProgress } from "@mui/material";
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
import Swal from "sweetalert2";

const TodoModal = ({ open, handleClose, userId, taskData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [addTask, { isLoading, error }] = useAddTaskMutation();
  const [updateTask, { isLoading: updateLoading }] = useUpdateTaskMutation();
  const { refetch } = useGetTasksQuery(userId);

  useEffect(() => {
    if (taskData) {
      reset({
        task: taskData.task,
        date: dayjs(taskData.date),
        time: dayjs(taskData.time, "HH:mm"),
      });
    } else {
      reset({
        task: "",
        date: null,
        time: null,
      });
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
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      if (taskData) {
        // Editing an existing task
        await updateTask({ id: taskData.id, updatedData: taskDetails });
        await refetch();
        Toast.fire({
          icon: "success",
          title: "Task updated successfully!",
        });
      } else {
        // Adding a new task
        await addTask(taskDetails);
        await refetch();
        Toast.fire({
          icon: "success",
          title: "Task added successfully!",
        });
      }

      reset(); // Reset form fields
      handleClose(); // Close the modal
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to save the task. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
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
          px: 5,
          py: 5,
          height: "auto",
          overflowY: "hidden",
          outline: "none",
          "@media (max-width: 768px)": { width: "90%", px: 2, py: 4 },
          "@media (max-width: 480px)": { width: "95%", px: 2, py: 4 },
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {taskData ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-10">
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
              Failed to save task. Please try again.
            </p>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 mt-5">
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              className="w-full h-11 !font-medium !text-base"
            >
              Cancel
            </Button>
            <Button
              className="w-full h-11 !font-medium !text-base flex items-center justify-center"
              type="submit"
              variant="contained"
              color="primary"
            >
              {isLoading || updateLoading ? (
                <CircularProgress className="!text-white" size={20} />
              ) : taskData ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TodoModal;
