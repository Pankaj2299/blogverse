import React from 'react'
import { useDispatch } from "react-redux"
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'


function LogoutBtn({ className = "" }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            await authService.logout()
            dispatch(logout())
            navigate("/")

        } catch {

        }


    }
    return (
        <button className={`px-5 py-2  hover:bg-red-600 hover:scale-[1.02] rounded-xl bg-red-500 text-white font-medium transition-all duration-200 shadow-sm ${className}`} onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn
