import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Input } from "../components/index";

function VerifyPending() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const resendVerification = async () => {

    try {

   const user = await authService.getCurrentUser();

    if (user?.emailVerification) {
      setMessage("Your email is already verified. Please login.");
      return;
    }



      await authService.login({
        email,
        password
      });

      const result = await authService.sendVerification();

      await authService.logout();

      if (result) {
        setMessage("Verification email sent successfully.");
      }

    } catch (error) {

        await authService.logout()

  if (
    error.message?.includes("already verified")
  ) {

    setMessage(
      "Your email is already verified. Please login."
    );

  } else {

    setMessage(
      "Invalid password or unable to send email."
    );

  }
}
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">

        <h1 className="text-3xl font-bold text-center text-orange-500 mb-4">
          Verify Your Email
        </h1>

        <p className="text-center text-slate-600 mb-6">
          Your account exists, but your email is not verified.
        </p>

        <p className="text-sm text-slate-500 mb-4">
          {email}
        </p>

        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <button
          onClick={resendVerification}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Resend Verification Email
        </button>

        {message && (
  <div className="mt-4 text-center">

    <p className="text-green-600">
      {message}
    </p>

    {message === "Your email is already verified. Please login." && (
      <button
        onClick={() => navigate("/login")}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    )}

  </div>
)}



      </div>

    </div>
  );
}

export default VerifyPending;