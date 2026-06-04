import React, { useState, useEffect } from 'react'
import dbservices from '../appwrite/dbService'
import { Container, PostCard } from '../components/index'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {

        dbservices.listPost().then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }

        })

    }, [])



    return (
        <div className='w-full py-10 sm:p-12'>
            <Container>

                {/* Page Heading  */}

                <div className='mb-10 text-center'>

                    <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4'>

                        Explore All Blogs ✨

                    </h1>

                    <p className='text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed'>

                        Discover inspiring stories, creative ideas, and blogs shared by passionate writers from around the world.

                    </p>

                </div>

                {/* Post Grid  */}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

                    {posts.map((post) => (
                        <PostCard key={post.$id}
                            {...post}
                        />
                    ))}

                </div>

            </Container>

        </div>
    )
}

export default AllPost



