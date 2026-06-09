import React, { useEffect, useState,useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

function VerifyEmail() {
  
  const hasRef = useRef(false)
console.log("VERIFY PAGE MOUNTED");
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("loading");

  useEffect(() => {

    const verify = async () => {

      if(hasRef.current) return
      hasRef.current =true

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

       console.log("VERIFY SUCCESS", result)
      

      if (result) {

        await authService.logout()

        navigate("/verify-success", { replace: true })

        return

      }


      else {
        setStatus("error");
      }

    };

    verify();

  }, []);





  return (

    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">

        {status === "loading" && (
          <p>Verifying your email...</p>
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