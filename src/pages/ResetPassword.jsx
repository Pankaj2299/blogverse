import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Input, Button } from "../components/index";
import { useForm } from "react-hook-form";


function ResetPassword() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const resetPassword = async (data) => {

    try {

      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");


         if (!userId || !secret) {
          setIsError(true)
      setMessage("❌ Invalid password reset link.");
      return;
    }


      await authService.resetPassword({
        userId,
        secret,
        password: data.password
      });

       setIsError(false)

      setMessage(
        "✅ Password updated successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setIsError(true)

      setMessage("❌ This password reset link is invalid or has expired.");

    }
  };

  return (
  <div className="min-h-[80vh] flex items-center justify-center px-4">

    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">

      <div className="text-center mb-6">

        <div className="text-5xl mb-3">
          🔒
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Create a New Password
        </h1>

        <p className="text-slate-600">
          Choose a strong password to secure your account.
        </p>

      </div>

      <form onSubmit={handleSubmit(resetPassword)}>

        <Input
          type="password"
          placeholder="Enter your new password"
          {...register("password", {
            required: "Password is required",
            validate: {
              matchPattern: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            }
          })}
        />

        {errors.password && (
          <p className="text-red-500 mt-2">
            {errors.password.message}
          </p>
        )}

        <div className="mt-4 mb-4 text-sm text-slate-500">

          <p className="font-medium mb-2">
            Password Requirements
          </p>

          <ul className="space-y-1">
            <li>✓ At least 8 characters</li>
            <li>✓ One uppercase letter</li>
            <li>✓ One lowercase letter</li>
            <li>✓ One number</li>
            <li>✓ One special character</li>
          </ul>

        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 text-white"
        >
          {isSubmitting
            ? "Saving..."
            : "Save New Password"}
        </Button>

      </form>

      {message && (
        <p
          className={`mt-5 text-center font-medium ${
            isError
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

    </div>

  </div>
);
}

export default ResetPassword;