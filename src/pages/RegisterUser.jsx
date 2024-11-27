import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmate.png";
import { useAddUserMutation } from "../store/api/userApi";
import Swal from "sweetalert2";
import image from "../assets/images/b3.jpg";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [registerUser] = useAddUserMutation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      if (response?.data && !response?.data?.error) {
        reset();
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
        Toast.fire({
          icon: "success",
          title: "User Registered!",
        });
        navigate("/");
      } else {
        console.log("User Adding failed!", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to add record!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Failed to add record!", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add record!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  useEffect(() => {
    document.title = "Register | TaskMate";
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        // height: "100vh",
      }}
    >
      <div className="hidden md:block absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <div className="z-20 bg-white py-12 px-6 md:px-12 rounded-lg shadow-lg w-10/12 md:w-2/5">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-36 md:w-48" />
        </div>
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-500 mb-8">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              {...register("username", {
                required: "User Name is required",
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 w-full h-12 rounded-md hover:bg-blue-600 font-medium text-white transition-all duration-300"
          >
            {loading ? (
              <CircularProgress className="!text-white" size={16} />
            ) : (
              "REGISTER"
            )}
          </button>

          {errors.form && (
            <div className="text-center text-red-500 mt-4">
              {errors.form.message}
            </div>
          )}

          <div className="text-center mt-8">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleLoginRedirect}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
