import React from "react";
import { useNavigate } from "react-router-dom";

function VerifySuccess() {

  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

  <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">

    <div className="text-6xl mb-4">
      🎉
    </div>

    <h1 className="text-3xl font-bold text-green-600 mb-4">
      Email Verified Successfully
    </h1>

    <p className="text-slate-600 mb-2">
      Your email address has been confirmed.
    </p>

    <p className="text-slate-500 mb-6">
      Your account is now fully activated and ready to use.
    </p>

    <button
      onClick={() => navigate("/login")}
      className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
    >
      Continue to Login
    </button>

  </div>

</div>
  );
}

export default VerifySuccess;