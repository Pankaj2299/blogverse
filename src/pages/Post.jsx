import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import dbservices from '../appwrite/dbService'
import bucketservices from '../appwrite/bucketService'
import { Button, Container } from '../components/index'
import parse from "html-react-parser"
import { useSelector } from 'react-redux'

function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {

    if (slug) {
      dbservices.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate("/")

      })
    }
    else {
      navigate("/")
    }

  }, [slug, navigate])

  const deletePost = async () => {
    const status = await dbservices.deletePost(post.$id)

    if (status) {

      await bucketservices.deleteFile(post.featuredImage)

      navigate("/")
    }


  }

  return post ? (

    <div className='py-8 sm:py-12'>

      <Container>

        {/* Title Section  */}

        <div className='max-w-5xl mx-auto mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 '>

            <div>

              <h1 className='text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4'>

                {post.title}

              </h1>


              <div className='flex items-center gap-4 flex-wrap'>

                {/* Avatar  */}
                <div className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md flex items-center justify-center text-sm font-bold '>

                  {post.authorName
                    ?.split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase()
                  }

                </div>

                {/* Author + Date  */}

                <div className='flex items-center gap-3 flex-wrap'>

                  <p className='text-slate-800 font-semibold text-lg'>

                    {post.authorName || "Anonymous"}

                  </p>

                  <span className='text-slate-300'>

                    •

                  </span>

                  <p className='text-slate-500 text-sm'>

                    {new Date(post.$createdAt).toLocaleDateString("en-US", {

                      day: "numeric",
                      month: "long",
                      year: "numeric"

                    })}

                  </p>

                </div>

              </div>

            </div>


          </div>

        </div>




        {/* Featured Image  */}

        <div className='relative w-full mb-10 overflow-hidden rounded-xl shadow-xl'>

          <img
            src={bucketservices.filePreview(post.featuredImage)}
            alt={post.title}
            className='w-full max-h-[500px] rounded-2xl'
          />

          {/* Edit/Delete Buttons  */}

          {isAuthor && (

            <div className='flex gap-3 absolute top-5 right-5'>

              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  className='rounded-xl text-white'
                  bgColor='bg-green-500'
                >

                  Edit

                </Button>
              </Link>

              <Button
                className='rounded-xl text-white'
                bgColor='bg-red-500'
                onClick={deletePost}
              >
                Delete

              </Button>

            </div>

          )}

        </div>


        {/* Content  */}

        <div className='max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10'>

          <div className='max-w-none text-slate-700 text-lg sm:text-xl leading-9 space-y-6'>

            {parse(post.content)}

          </div>



        </div>



      </Container>
    </div>



  ) : null
}

export default Post








