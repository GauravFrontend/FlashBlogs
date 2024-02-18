import React from 'react'
import { useSelector } from 'react-redux'
const Home = () => {

    const userData = useSelector((state) => state.auth.userData)

  return userData ? (
    <>
    <h1 className='text-3xl' >Welcome to Home</h1>
    <h1 className='text-3xl' >Login Completed</h1>
    <h1 className='text-3xl' >{userData.name}</h1>
    </>
  ) : (
    <>
    <h1 className='text-3xl' >Welcome to Home</h1>
    <h1 className='text-3xl' >Please Login</h1>

    </>
  )
}

export default Home