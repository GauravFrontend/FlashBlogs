import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <>
            <Link className='aspect-square object-contain '  to={`/post/${$id}`} >
                <div className="max-w-sm  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <div className="max-w-sm max-h-72 overflow-hidden">
                        <img className="rounded-t-lg object-cover w-full h-full" src={service.getFilePreview(featuredImage)} alt="" />
                    </div>


                    <div className="p-5">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>

                        
                    </div>
                </div>
            </Link>
        </>
    )
}

export default PostCard