import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../appwrite/config';
import PostCard from '../components/PostCard';


const Home = () => {

  const userData = useSelector((state) => state.auth.userData)
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    service.getPosts().then((items) => {
      setPosts(items.documents)
    })
  }, [userData]);


  return userData ? (
    <>
      {posts ? (
        <div >
				<div className=" flex flex-wrap justify-start align-middle gap-5" >

					{posts.map((post) => {
						return <div className='flex' key={post.$id} >
							<PostCard {...post} />
						</div>
					})}
				</div>
			</div>
      ) : (<h1>loading</h1>)}
    </>
  ) : (
    <>
      <h1 className='text-3xl' >Welcome to Home</h1>
      <h1 className='text-3xl' >Please Login</h1>

    </>
  )
}

export default Home