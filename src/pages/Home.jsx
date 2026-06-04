import React, { useEffect, useState } from 'react'
import dbservices from '../appwrite/dbService'
import { Container, PostCard } from '../components/index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const authStatus = useSelector(state => state.auth.status)


    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    useEffect(() => {

        dbservices.listPost().then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }

            setLoading(false)
        })


    }, [])







    return (

        <>

            {!loading && !authStatus && (

                <div className='w-full py-16'>

                    <Container>

                        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10 text-center '>

                            <div className='text-6xl mb-6'>
                                ✨

                            </div>

                            <h1
                                className='text-3xl sm:text-5xl max-w-4xl mx-auto leading-tight font-bold !text-slate-800 mb-4'>

                                Discover Stories That Inspire

                            </h1>
                            <p
                                className='text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed mb-10 text-center '
                            >
                                Explore inspiring blogs, discover fresh ideas, and connect with stories shared by passionate writers around the world.

                            </p>

                            <Link to="/login">

                                <button
                                    className='px-6 py-3 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all duration-200 mt-10'
                                >
                                    Sign In to Start Writing

                                </button>


                            </Link>


                        </div>
                    </Container>

                </div>

            )}





            <div className='w-full py-10'>

                <Container>

                    {/* Hero Section  */}

                    {authStatus && (

                        <div
                            className='mb-16 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden'

                        >


                            <div

                                className='grid grid-cols-1 lg:grid-cols-2 items-center'>



                                {/* Left Content */}

                                <div className='p-8 sm:p-10 lg:p-16 text-center lg:text-left'>

                                    <div className='text-5xl mb-6'>
                                        ✍️
                                    </div>

                                    <h1

                                        className='text-3xl lg:text-4xl sm:text-3xl font-extrabold tracking-tight !text-slate-900 leading-tight mb-4'>

                                        Share Your Ideas With The World 🚀

                                    </h1>


                                    <p
                                        className='text-base sm:text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0'>

                                        Create blogs, share your thoughts, and inspire readers through your stories and experiences.

                                    </p>


                                    <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>

                                        <Link
                                            to="/all-post">
                                            <button
                                                className='w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all'>

                                                Start Reading

                                            </button>

                                        </Link>


                                        <Link
                                            to="/add-post">

                                            <button
                                                className='w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold hover:bg-slate-100 transition-all duration-200'>

                                                Write a Blog

                                            </button>

                                        </Link>

                                    </div>

                                </div>




                                {/* Right Side */}

                                <div
                                    className='h-full min-h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col items-center justify-center text-center p-10'>


                                    <div className='text-[90px] mb-10 leading-none animate-bounce'>

                                        🚀

                                    </div>

                                    <h2
                                        className=' text-3xl font-bold text-white mb-4 ' >

                                        Start Writing Today

                                    </h2>


                                    <p
                                        className=' text-slate-300 text-lg max-w-sm leading-relaxed'>


                                        Share your thoughts, ideas, and stories with readers around the world.

                                    </p>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* Post Grid  */}

                    <div
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    >
                        {posts.map((post) => (

                            <PostCard
                                key={post.$id}
                                {...post}
                            />
                        ))}


                    </div>


                </Container>
            </div>

        </>
    )


}

export default Home


































