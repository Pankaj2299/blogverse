import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Input, Button } from "../components/index";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendRecovery = async () => {

    setError("");
    setMessage("");

    try {

      await authService.sendPasswordRecovery(email);

      setMessage(
        "Password recovery email sent successfully."
      );

    } catch (error) {

      setError(error.message);

    }
  };

  return (

    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">

        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <Input
          type="email"
          placeholder="Enter your email"
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
          <p className="text-green-600 mt-4 text-center">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 mt-4 text-center">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default ForgotPassword;