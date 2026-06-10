import React, { useEffect, useState,useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";



function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("waiting");

  const handleVerify = async () => {
    try {
      setStatus("loading");

      console.log("VERIFY PAGE OPENED");
      console.log("TIME:", new Date().toISOString());
      console.log("URL:", window.location.href);

      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      console.log("userId =", userId);
      console.log("secret =", secret);

      if (!userId || !secret) {
        setStatus("invalid");
        return;
      }

      const result = await authService.verifyEmail(
        userId,
        secret
      );

      console.log("VERIFY SUCCESS", result);

      if (result) {
        navigate("/verify-success", { replace: true });
        return;
      }

      setStatus("error");
    } catch (error) {
      console.error("Verification Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">

        {status === "waiting" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Verify Your Email
            </h1>

            <p className="text-slate-600 mb-6">
              Click the button below to complete verification.
            </p>

            <button
              onClick={handleVerify}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white"
            >
              Verify Email
            </button>
          </>
        )}

        {status === "loading" && (
          <p>Verifying your email...</p>
        )}

        {status === "invalid" && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Invalid Link
            </h1>

            <p className="text-slate-600">
              Verification link is missing required data.
            </p>
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
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;

