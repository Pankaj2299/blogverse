import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../features/authSlice'
import { Button, Input, Logo } from "../index"
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from 'react-hook-form'

console.log("Login Build  Test 123")

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {

      const session = await authService.login(data)
      if (session) {

        const userData = await authService.getCurrentUser()
            

        if (!userData.emailVerification) {
          await authService.logout()



          navigate("/verify-pending", {
            state: {
              email: data.email
            }
          })

          return
        }

        dispatch(authLogin({
          userData: {
            $id: userData.$id,
            name: userData.name,
            email: userData.email
          }
        }))



      }



    } catch (error) {


      setError(error.message)

    }

  }


  return (

    <div className=' min-h-[80vh] flex items-center justify-center px-4'>
      <div className='w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200'>

        {/* Logo */}

        <div className='mb-6 flex justify-center'>

          <div className='w-full max-w-[140px]'>

            <Logo width='100%' />

          </div>


        </div>

        {/* Heading  */}
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold tracking-tight !text-slate-800'>
            Welcome Back
          </h2>

          <p className='mt-2 text-slate-500'>
            Sign in to continue to your account

          </p>

        </div>

        {/* Signup Link  */}

        <p className='text-center text-sm text-slate-600 mb-6'>
          Don&apos;t have any account?{" "}
          <Link
            to="/signup"
            className='font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200'>
            Sign Up

          </Link>
        </p>

        {/* Error Handling  */}

        {error && (
          <p className='text-red-500 text-sm text-center mb-4'>
            {error}
          </p>
        )}

        {/* Form  */}

        <form onSubmit={handleSubmit(login)} className='space-y-5'>



          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(value) ||
                  "Email address must be a valid address"
              }
            })}
          />


          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true
            })}

          />

          {/* Forgot Password */}

          <div className="text-right">

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <Button type='submit' className='w-full py-3 text-base font-semibold rounded-2xl hover:bg-blue-700 text-white shadow-md hover:shadow-lg' disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>




        </form>

      </div>
    </div>
  )
}

export default Login



