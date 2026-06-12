import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { Button, Input, Logo } from "../index"
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../features/authSlice'

function SignUp() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const create = async (data) => {

    setError("")

    data.name = data.name
      .split(" ")
      .map((word) => (
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      ))
      .join(" ")

    try {

      const account = await authService.CreateAccount(data)

      if (account) {

        await authService.login({
          email: data.email,
          password: data.password
        })

         await authService.sendVerification()

         await authService.logout()

         navigate("/check-email")
 
       }

    }

    catch (error) {
      if (error.code === 409) {
        setError(
          "An account with this email already exists."
        );
      } else {
        setError(
          "Unable to create account. Please try again."
        );
      }

    }

  }



  return (
    <div className=' flex items-center justify-center px-4'>
      <div className='w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200'>

        <div className='mb-6 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>

        </div>


        <h2 className='text-center text-3xl font-bold leading-tight mb-3'>
          Create Your Account
        </h2>

        <p className='text-center text-slate-500 mb-4'>
          Join us and get started in just a few seconds.
        </p>

        <p className='text-center mt-2 text-slate-500'>
          Already have an account?&nbsp;

          <Link
            to="/login"
            className=" font-semibold text-blue-600 hover:text-blue-700 text-primary transition-all duration-200 hover:underline">
            Sign In

          </Link>
        </p>

        {error &&
        
          <p className='text-red-600 mt-8 text-center'>{error}</p>
        }

        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>

            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              {...register("name", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters"
                }
              })}
            />
            {errors.name &&

              <p className='text-red-500'>{errors.name.message}</p>
            }
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Email address must be a valid address",
                }

              })}
            />

            {errors.email &&

              <p className='text-red-500'>{errors.email.message}</p>
            }

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
                }
              })}
            />

            <p className="text-sm text-slate-500 mt-3">
              🔒 Use a strong password to help keep your account secure.
            </p>

            <div className="text-sm text-slate-500">

              <p className="font-medium mb-2">
                Password Requirements
              </p>

              <ul className="space-y-1">
                <li>✓ At least 8 characters</li>
                <li>✓ One uppercase letter</li>
                <li>✓ One lowercase letter</li>
                <li>✓ One number</li>
                <li>✓ One special character</li>
              </ul>

            </div>


            {errors.password &&

              <p className='text-red-500'>{errors.password.message}</p>
            }

            <Button
              type='submit'
              className='w-full text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>


          </div>

        </form>

      </div>

    </div>
  )
}

export default SignUp
