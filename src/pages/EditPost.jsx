import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import dbservices from '../appwrite/dbService'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
   const [post, setPost] = useState(null)
   const { slug } = useParams()
   const navigate = useNavigate()
   useEffect(() => {
      if (slug) {
         dbservices.getPost(slug).then((post) => {
            setPost(post)
         })
      }
      else {
         navigate("/")
      }

   }, [slug, navigate])


   return post ? (

      <div className='py-10 sm:py-12'>

         <Container>

            {/* Page Header */}

            <div className='mb-10 text-center'>

               <h1
                  className='text-4xl sm:text-5xl font-extrabold tracking-tight !text-slate-900 mb-4'
               >

                  Edit Your Blog ✏️

               </h1>



               <p
                  className=' text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed'
               >

                  Update your blog content, improve your ideas, and keep your stories fresh.

               </p>



            </div>

            {/* Form Card */}

            <div
               className=' bg-white border border-slate-200 rounded-3xl shadow-sm sm:p-10'
            >

               <PostForm post={post} />

            </div>

         </Container>

      </div>

   ) : null

}

export default EditPost




