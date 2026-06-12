import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Input } from "../components/index";


function VerifyPending() {

  const location = useLocation()
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const email = location.state?.email || "";

  const resendVerification = async () => {
    setMessage("");
    setIsError(false);

    // Password empty check
    if (!password.trim()) {
      setIsError(true);
      setMessage("Please enter your password.");
      return;
    }

    try {
      const user = await authService.getCurrentUser();

      if (user?.emailVerification) {
        setIsError(false);
        setMessage(
          "Your email is already verified. Please login."
        );
        return;
      }

      await authService.login({
        email,
        password,
      });

      const result = await authService.sendVerification();

      await authService.logout();

      if (result) {
        setIsError(false);
        setMessage(
          "Verification email sent successfully."
        );
      }

    } catch (error) {


      try {
        await authService.logout();
      } catch { }

      const errorMessage =
        error?.message?.toLowerCase() || "";

      if (
        error.code === 401 ||
        errorMessage.includes("password") ||
        errorMessage.includes("credentials") ||
        errorMessage.includes("invalid credentials")
      ) {
        setIsError(true);
        setMessage("Incorrect password.");
      }
      else if (
        errorMessage.includes("already verified")
      ) {
        setIsError(false);
        setMessage(
          "Your email is already verified. Please login."
        );
      }
      else {
        setIsError(true);
        setMessage(
          "Unable to send verification email. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">
            📧
          </div>

          <h1 className="text-3xl font-bold text-orange-500 mb-3">
            Email Verification Required
          </h1>

          <p className="text-slate-600">
            Your account has been created successfully,
            but your email address has not been verified yet.
          </p>
        </div>

        <div className="bg-slate-50 border rounded-xl p-4 mb-5">
          <p className="text-xs text-slate-500 mb-1">
            Registered Email
          </p>

          <p className="font-medium break-all">
            {email}
          </p>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          Enter your password below and we'll send you
          a fresh verification email.
        </p>

        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <button
          onClick={resendVerification}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl"
        >
          Send Verification Email
        </button>

        {message && (
          <div className="mt-5 text-center">

            <p
              className={
                isError
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {message}
            </p>

            {message ===
              "Your email is already verified. Please login." && (
                <button
                  onClick={() => navigate("/login")}
                  className="mt-4 w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  Continue to Login
                </button>
              )}

          </div>
        )}

      </div>

    </div>
  );
}

export default VerifyPending;