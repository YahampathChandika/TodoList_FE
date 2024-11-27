import React, { useEffect, useState } from "react";
import { TextField, CircularProgress } from "@mui/material";
// import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store/api/authApi";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log("loginUser", response);
      if (response.data && !response.data.error) {
        const accessToken = response.data.token;
        localStorage.setItem("accessToken", accessToken);
        navigate("/home");
        reset();
        setErrorMessage(null);

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
          title: "Welcome to Cook!",
        });
      } else {
        setErrorMessage(
          response?.error?.data?.message ||
            response?.error?.data?.errors[0]?.msg ||
            "Login failed"
        );
      }
    } catch (error) {
      console.error("Login Error", error);
      setErrorMessage("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/registerUser");
  };

  useEffect(() => {
    document.title = "LogIn | Cook";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white py-12 px-6 md:px-12 rounded-lg shadow-lg w-10/12 md:w-1/4">
        {/* <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-32 md:w-48" />
        </div> */}

        <h2 className="text-center text-3xl md:text-4xl font-semibold text-rose-pink mb-8">
          LogIn
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            {...register("username", {
              required: "Please enter your username.",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="!mt-6 !mb-8"
            {...register("password", {
              required: "Please enter your password.",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <button
            type="submit"
            className="bg-rose-pink w-full h-12 rounded-md hover:bg-dark-pink text-white transition-all duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress className="!text-white" size={16} />
            ) : (
              "SIGN IN"
            )}
          </button>

          {errorMessage && (
            <div className="text-sm md:text-base text-center text-red-500 mt-4">
              {errorMessage}
            </div>
          )}
        </form>

        <div className="text-center mt-8">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={handleCreateAccount}
              className="text-pink-600 hover:underline"
            >
              Create an account
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
