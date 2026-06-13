import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import bucketservices from '../../appwrite/bucketService'
import dbservices from '../../appwrite/dbService'


function PostForm({ post }) {

    const navigate = useNavigate()

    const { register, handleSubmit, watch, setValue, getValues, control,reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {

            const file = data.image[0] ? await bucketservices.uploadFile(data.image[0]) : null


            if (file) {
                await bucketservices.deleteFile(post.featuredImage)
            }

            const dbPost = await dbservices.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        }

        else {
            const file = await bucketservices.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const DbPost = await dbservices.createPost({
                    ...data,
                    userId: userData.$id,
                    authorName: userData.name
                })

                if (DbPost) {
                    navigate(`/post/${DbPost.$id}`)
                }

            }

        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .slice(0, 30)
                .replace(/-\w*$/, "")


        }
        return ""

    }, [])


    useEffect(() => {
        if(post){
        
            reset({
                title :post.title,
                slug: post.slug || slugTransform(post.title),
                content:post.content,
                status:post.status
            })
        }
    },[post,reset])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }

        })

        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])



    return (

        <form
            onSubmit={handleSubmit(submit)}
            className='flex flex-wrap gap-y-8'>

            {/* Left Section  */}

            <div className='w-full lg:w-2/3 px-2'>

                <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6'>

                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", {
                            required: true
                        })}
                    />

                    <Input
                        label="Slug :"
                        placeholder="slug"
                        className="mb-4"
                        {...register("slug", {
                            required: true
                        })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }}
                    />

                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>

            </div>


            {/* Right Section  */}

            <div className='w-full lg:w-1/3 px-2'>

                <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6'>



                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    {post && (
                        <div className='w-full mb-4'>

                            <img src={bucketservices.filePreview(post.featuredImage)}
                                alt={post.title}
                                className='w-full rounded-xl shadow-sm border border-slate-200'

                            />

                        </div>
                    )}

                    <Select
                        label="Status"
                        options={["active", "inactive"]}
                        className="mb-4"
                        {...register("status", { required: true })}

                    />

                    <Button
                        type='submit'

                        bgColor={post ? "bg-green-500" : undefined} className='w-full py-3 text-base font-semibold rounded-2xl shadow-md hover:shadow-lg text-white'
                        disabled={isSubmitting}>

                        {
                            post ? (isSubmitting ? "Updating..." : "Update")
                                : (isSubmitting ? "Uploading and Publishing..."
 : "Publish Post")
                        }

                    </Button>

                </div>
            </div>


        </form>


    )

}

export default PostForm




