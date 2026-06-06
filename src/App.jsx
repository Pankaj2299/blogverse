
import conf from './conf/conf'
import authService from './appwrite/auth'
import './App.css'
import { Header, Footer,ScrollToTop } from "./components/index"
import { useState, useEffect } from 'react'
import { login, logout } from "./features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from 'react-router-dom'



function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {

        if (userData) {

          dispatch(login({
            userData: {
              $id: userData.$id,
              name: userData.name,
              email: userData.email

            }
          }))

        }
        else {
          dispatch(logout())
        }
      })
      .catch(() => {
        dispatch(logout())
      })

      .finally(() => setLoading(false))
  }, [])



  return loading ?
    (
      <div className='min-h-screen flex items-center justify-center bg-slate-100'>

        <div className='text-center'>

          <div className='text-5xl mb-4 animate-bounce'>
            🚀
          </div>

          <h1 className='text-2xl font-bold text-slate-800 mb-2'>

            Loading BlogVerse

          </h1>


          <p className='text-slate-500'>

            Please wait...

          </p>

        </div>

      </div>

    ) :

    (

      <div className='min-h-screen flex flex-col bg-slate-100'>

            <ScrollToTop/>
            
        <div className='flex flex-col flex-grow'>
          <Header />
          <main className='flex-grow'>

            <Outlet />
          </main>
          <Footer />

        </div>
      </div>
    )


}

export default App










