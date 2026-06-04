import React from 'react'
import { PostForm, Container } from '../components/index'

function AddPost() {



   return (

      <div className='py-10 sm:py-12'>

         <Container>

            {/* Page Header */}

            <div className='mb-10 text-center'>

               <h1
                  className=' text-4xl sm:text-5xl font-extrabold tracking-tight !text-slate-900 mb-4'
               >

                  Create New Blog ✍️

               </h1>



               <p
                  className=' text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed'
               >

                  Share your thoughts, ideas, and stories with readers around the world.

               </p>

            </div>

            {/* Form Card */}



            <div
               className=' bg-white border border-slate-200 rounded-3xl shadow-sm sm:p-10'
            >

               <PostForm />

            </div>

         </Container>

      </div>



   )

}

export default AddPost
