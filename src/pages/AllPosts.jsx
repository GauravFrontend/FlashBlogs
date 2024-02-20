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

    return filtered ? (
        <div >
				<div className=" flex flex-wrap justify-start align-middle gap-5" >

					{filtered.map((post) => {
						return <div className='flex' key={post.$id} >
							<PostCard {...post} />
						</div>
					})}
				</div>
			</div>
    ) : null;
}

export default AllPosts