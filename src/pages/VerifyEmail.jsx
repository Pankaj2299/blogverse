import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";



function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("waiting");

  const handleVerify = async () => {
    
    try {

      setStatus("loading")

      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      if (!userId || !secret) {
        setStatus("invalid");
        return;
      }

      const result = await authService.verifyEmail(
        userId,
        secret
      );

      if (result) {
        navigate("/verify-success", { replace: true });
        return;
      }

      setStatus("error");
    } catch (error) {

      setStatus("error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">

        {status === "waiting" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Confirm Your Email
            </h1>

            <p className="text-slate-600 mb-6">
              Your verification link has been received.
              Click below to complete the verification process
              and continue using your account.
            </p>

            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Complete Verification
            </button>
          </>
        )}

        {status === "loading" && (
          <div className="text-center">
            <p className="text-lg font-medium">
              Verifying your account...
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Please wait a moment.
            </p>
          </div>
        )}

        {status === "invalid" && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Invalid Link
            </h1>

            <p className="text-slate-600">
              Verification link is missing required data.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl"
            >
              Back to Login
            </button>

          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              ❌ Verification Failed
            </h1>

            <p className="text-slate-600">
              The verification link is invalid or expired.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;

