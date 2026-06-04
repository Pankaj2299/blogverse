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

        const result = await authService.sendVerification()
        await authService.logout()
        navigate("/check-email")

      }





    }

    catch (error) {

      setError(error.message)
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

        <h2 className='text-center text-3xl font-bold leading-tight mb-4'>Sign up to create account</h2>

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
