function CheckEmail() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">

        <div className="text-6xl mb-4">
          📧
        </div>

        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Check Your Email
        </h1>

        <p className="text-slate-600 mb-4">
          We've sent a verification email to your inbox.
        </p>

        <p className="text-slate-500 text-sm mb-6">
          Please open the email and click the verification link
          to activate your account.
        </p>

        <div className="bg-slate-50 border rounded-xl p-4 text-sm text-slate-600">

          <p>
            💡 If you don't see the email, check your
            spam or junk folder.
          </p>

        </div>

      </div>

    </div>
  )
}

export default CheckEmail