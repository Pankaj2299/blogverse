import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Input, Button } from "../components/index";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendRecovery = async () => {

    if (!email.trim()) {
  setError("Please enter your email address.");
  return;
    }

    setError("");
    setMessage("");

    try {

      await authService.sendPasswordRecovery(email);

      setMessage(
        "Password recovery email sent successfully."
      );

    } catch (error) {

      setError( "Unable to send password reset email. Please try again.");

    }
  };

  return (

    <div className="min-h-[80vh] flex items-center justify-center px-4">

  <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">

    <div className="text-center mb-6">

      <div className="text-5xl mb-3">
        🔑
      </div>

      <h1 className="text-3xl font-bold mb-3">
        Forgot Your Password?
      </h1>

      <p className="text-slate-600">
        Enter your email address and we'll send you
        a secure password reset link.
      </p>

    </div>

    <Input
      type="email"
      placeholder="Enter your email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <Button
      onClick={sendRecovery}
      className="w-full mt-4 text-white"
    >
      Send Reset Link
    </Button>

    {message && (
      <div className="mt-5 text-center">

        <p className="text-green-600 font-medium">
          📩 Password reset email sent.
        </p>

        <p className="text-slate-500 text-sm mt-2">
          Please check your inbox and follow the
          instructions to reset your password.
        </p>

      </div>
    )}

    {error && (
      <div className="mt-5 text-center">

        <p className="text-red-600 font-medium">
          {error}
        </p>

      </div>
    )}

  </div>

</div>
  );
}

export default ForgotPassword;