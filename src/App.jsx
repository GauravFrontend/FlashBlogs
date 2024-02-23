import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Footer from './components/Footer'
import {login,logout} from "./store/authSlice"
import authService from './appwrite/auth'


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        console.log("chla to hai")
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])


  return !loading ? (
   <>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  ):null
}

export default App
