import React from 'react'
import { Link } from "react-router-dom"
import bucketServices from "../../appwrite/bucketService"

function PostCard({ $id, title, featuredImage, authorName, $createdAt }) {


  return (



    <Link to={`/post/${$id}`}>

      <div className='h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:translate-y-1 flex flex-col'>

        {/* Image  */}

        <div className='w-full h-56 overflow-hidden bg-slate-200'>

          <img

            src={bucketServices.filePreview(featuredImage)}
            alt={title}
            className='w-full h-full object-cover hover:scale-105 transition-all duration-500' />
        </div>

        {/* Content  */}

        <div className='p-5 flex flex-col  flex-grow'>

          <h2 className='text-xl font-bold !text-slate-800 leading-snug line-clamp-2 min-h-[56px] '>

            {title}

          </h2>

          {/* AuthorName + Date + Avatar  */}
          <div className='flex gap-3 mt-3 items-center'>

            <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-xs font-bold'>

              {authorName?.
                split(" ")
                .map(word => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "A"}

            </div>

            <div className='flex items-center gap-2 text-sm text-slate-500'>

              <span>

                {authorName || "Anonymous"}

              </span>

              <span>•</span>

              <span className='text-slate-500 text-sm'>

                {new Date($createdAt).toLocaleDateString("en-US", {

                  day: "numeric",
                  month: "short",
                  year: "numeric"

                })}

              </span>

            </div>

          </div>
        </div>

      </div>

    </Link>

  )
}

export default PostCard





