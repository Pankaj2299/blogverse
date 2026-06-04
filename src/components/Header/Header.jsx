import React, { useState, useRef, useEffect } from 'react'
import { Logo, LogoutBtn, Container } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"


function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector(state => state.auth.userData)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },

    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },

    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus
    },

    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    },
  ]

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {

        setShowMenu(false)
      }

    }

    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }


  }, [])

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm'>
      <Container>
        <nav className={`py-4 ${authStatus ? "flex items-center justify-between" : "flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between"}`}>

          {/* logo  */}
          <div className='flex items-center justify-center md:justify-start'>
            <Link to="/">
              <Logo width='90px' />
            </Link>
          </div>

          {/* navigation  */}

          <ul className={`${authStatus ? "hidden md:flex" : "flex"} flex flex-wrap items-center justify-center md:justify-end gap-2`}>

            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>

                  <button
                    onClick={() => navigate(item.slug)}

                    className='px-4 sm:px-5 py-2 text-sm sm:text-base rounded-xl text-slate-700 font-medium hover:bg-slate-100 hover:text-blue-600 transition-all duration-200'>

                    {item.name}
                  </button>

                </li>
              ) : null
            )}

            {/* Logout + Avatar    */}
            {authStatus && (
              <li className='flex items-center gap-2 ml-2'>
                <LogoutBtn />



                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md flex items-center justify-center text-sm font-bold'>

                  {userData?.name?.split(" ").map((word) => word.charAt(0)).join("").toUpperCase()}

                </div>



              </li>
            )}



          </ul>

          {/* Menu bar for small devices  */}

          {authStatus && (
            <div ref={menuRef} className="md:hidden relative flex justify-end">

              <button
                onClick={() => setShowMenu(prev => !prev)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md flex items-center justify-center text-sm font-bold"
              >
                {userData?.name
                  ?.split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()}
              </button>

              {showMenu && (
                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

                  {navItem.map((item) =>
                    item.active ? (
                      <div key={item.name}>

                        <button
                          onClick={() => {
                            navigate(item.slug)
                            setShowMenu(false)
                          }}
                          className='w-full text-left px-4 py-3 text-sm text-slate-700 font-medium hover:bg-slate-100 hover:text-blue-600 transition-all duration-200'

                        >
                          {item.name}
                        </button>


                      </div>
                    ) : null

                  )}





                  <div className="border-t">
                    <LogoutBtn
                      className='w-full rounded-none bg-transparent !text-red-600 shadow-none hover:bg-red-50 hover:text-red-700 hover:scale-100 text-left'
                    />
                  </div>

                </div>
              )}

            </div>
          )}

        </nav>
      </Container>


    </header>
  )
}

export default Header



