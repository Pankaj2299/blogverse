import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from 'react-router-dom'
import { AuthLayout ,Login} from './components/index.js'
import {Home,AddPost,AllPost,EditPost,SignUp,Post,VerifyEmail,CheckEmail,VerifyPending,VerifySuccess,ForgotPassword,ResetPassword} from './pages/index.js'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

    <Route path='/' element={<Home/>}/>

     {/* Public  */}

       <Route path='/check-email' element={<CheckEmail/>}/>
       <Route path='/verify-email' element={<VerifyEmail/>}/>
       <Route path='/verify-pending' element={<VerifyPending/>}/>
       <Route path='/verify-success' element={<VerifySuccess/>}/>
       <Route path='/post/:slug' element= {<Post/>} />

      {/* Guest Only  */}


      <Route path='/login' element= {
        <AuthLayout authentication={false}>
        <Login/>
        </AuthLayout>
        }/>

      <Route path='/signup' element= {
        <AuthLayout authentication={false}>
        <SignUp/>
        </AuthLayout>
        }/>

        <Route path='/forgot-password' element={
          <AuthLayout authentication ={false}>
            <ForgotPassword/>
          </AuthLayout>
        }/>

        <Route path='/reset-password' element={
          <AuthLayout authentication ={false}>
            <ResetPassword/>
          </AuthLayout>
        }/>

         
         {/* Protected  */}

      <Route path='/all-post' element= {
        <AuthLayout authentication>
          {""}
          <AllPost/>

        </AuthLayout>
        
        }/>


      <Route path='/add-post' element= {
        <AuthLayout authentication>
          {""}
          <AddPost/>

        </AuthLayout>
       
        }/>

      <Route path='/edit-post/:slug' element= {
        <AuthLayout authentication>
          {""}

          <EditPost/>
        </AuthLayout>
        
        }/>


        
    </Route>
      )
    )
       
    
    createRoot(document.getElementById('root')).render(
      
      

        <Provider store={store}>
       <RouterProvider router={router}/>
        </Provider>
    
        
     
    )

      


