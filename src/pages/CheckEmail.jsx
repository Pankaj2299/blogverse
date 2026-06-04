function CheckEmail() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">

        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          📧 Check Your Email
        </h1>

        <p className="text-slate-600">
          We have sent a verification link to your email address.
          Please check your inbox and verify your account.
        </p>

      </div>
    </div>
  )
}

export default CheckEmail