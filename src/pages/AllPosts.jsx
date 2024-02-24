import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';

const AllPosts = () => {
    const [filtered, setFiltered] = useState(null);
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        const useeffectallpost = async () => {
            if (userData) {
                const response = await service.getPosts()
                if (response) {
                    const filterdPost = response.documents.filter((item) => item.userId === userData.$id);
                    setFiltered(filterdPost)
                    console.log(filterdPost)
                }
            }

        }

        useeffectallpost();
    }, [userData]);

    if (filtered) {
        console.log(filtered)
    }

    return filtered && filtered.length>0 ? (
        <div >
				<div className=" flex flex-wrap justify-start align-middle gap-5" >

					{filtered.map((post) => {
						return <div className='flex' key={post.$id} >
							<PostCard {...post} />
						</div>
					})}
				</div>
			</div>
    ) : (
        <>
      
      <div className='h-96 flex flex-col justify-center align-middle' >
      <h1 className='text-3xl' >"It seems like you haven't posted anything yet."</h1>
        </div>
    </>
    );
}

export default AllPosts