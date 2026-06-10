import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Input, Button } from "../components/index";
import { useForm } from "react-hook-form";


function ResetPassword() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const resetPassword = async (data) => {

    try {

      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");


         if (!userId || !secret) {
      setMessage("❌ Invalid password reset link.");
      return;
    }


      await authService.resetPassword({
        userId,
        secret,
        password: data.password
      });

      setMessage(
        "✅ Password updated successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setMessage("❌ This password reset link is invalid or has expired.");

    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">

        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit(resetPassword)}>

          <Input
            type="password"
            placeholder="Enter new password"
            {...register("password", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
              }
            })}
          />

          {errors.password &&
            <p className='text-red-500'>{errors.password.message}</p>
          }

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 text-white"
          >
            {isSubmitting
              ? "Updating..."
              : "Update Password"}
          </Button>

        </form>

        {message && (
          <p className="mt-4 text-center text-green-600">
            {message}
          </p>
        )}



      </div>

    </div>
  );
}

export default ResetPassword;