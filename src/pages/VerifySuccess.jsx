import React from "react";
import { useNavigate } from "react-router-dom";

function VerifySuccess() {

  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Email Verified
        </h1>

        <p className="text-slate-600 mb-6">
          Your email has been verified successfully.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Login Now
        </button>

      </div>

    </div>
  );
}

export default VerifySuccess;