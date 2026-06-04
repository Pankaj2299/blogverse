import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        if (authentication) {

            if (!authStatus) {

                navigate("/login")
            }

        } else {

            if (authStatus) {

                navigate("/")
            }
        }
        setLoader(false)

    }, [authStatus, navigate, authentication])

    return loader ? (
        <div className='flex items-center justify-center min-h-[60vh]'>

            <h1 className='text-2xl font-semibold text-slate-700 animate-pulse'>

                Loading...

            </h1>
        </div>
    )
        : (
            <>

                {children}

            </>

        )


}

export default AuthLayout
