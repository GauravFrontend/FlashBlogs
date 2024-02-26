import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../appwrite/config';
import PostCard from '../components/PostCard';
import BoltLoader from '../components/BoltLoader';


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
      ) : (
        <div className='h-96 p-12 flex justify-center align-middle' >
          <BoltLoader
            className={"loaderbolt "}
            boltColor={"#5383FF"}
            desktopSize="50px"
            mobileSize="30px"
            backgroundBlurColor={"#FFBB12"}
          />
        </div>
      )}
    </>
  ) : (
    <>

      <div className='h-96 flex flex-col justify-center align-middle' >
        <h1 className='text-3xl' >Welcome to Home</h1>
        <h1 className='text-3xl' >Please Login</h1>
      </div>
    </>
  )
}

export default Home