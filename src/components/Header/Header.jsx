import { useState } from "react";
import {
    PaperAirplaneIcon,
    MoonIcon,
    SunIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'



function Header() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const isUserActive = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
            setToggleMenu(!toggleMenu)
            navigate("/")
        })
    }


    return (
        <div className="app">
            <nav>
                <div className="max-w-7xl mx-auto">
                    <div className="flex mx-auto justify-between w-5/6 ">
                        {/* Primary menu and logo */}
                        <div className="flex items-center gap-16 my-12">
                            {/* logo */}
                            <div>
                                <Link
                                    href="/"
                                    className="flex gap-1 font-bold text-gray-700 items-center "
                                >
                                    <img className=' w-24 ' src="../../flashblogs.png" alt="" />
                                </Link>
                            </div>
                            {/* primary */}
                            <div className="hidden lg:flex gap-8 ">
                                <Link href="#" className="">
                                    Home
                                </Link>
                                <Link to="/all-posts">All Posts</Link>
                                <Link href="#">Add Post</Link>
                            </div>
                        </div>
                        {/* secondary */}
                        <div className="flex gap-6">
                            <div className="hidden xs:flex items-center gap-10">
                                <div className="hidden lg:flex items-center gap-2">
                                    <MoonIcon className="h-6 w-6" />
                                    <SunIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    {isUserActive ? (
                                        <Link onClick={handleLogout} className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                                            Logout
                                        </Link>
                                    ) : (
                                        <div className="flex gap-4">
                                            <Link to="/login" className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                                                Login
                                            </Link>
                                            <Link to="/signup" className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                                                Signup
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Mobile navigation toggle */}
                            <div className="lg:hidden flex items-center">
                                <button onClick={() => setToggleMenu(!toggleMenu)}>
                                    <Bars3Icon className="h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* mobile navigation */}
                <div
                    className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${!toggleMenu ? "h-0" : "h-full"
                        }`}
                >
                    <div className="px-8">
                        <div className="flex flex-col gap-8 font-bold tracking-wider">
                            <Link to="/"  onClick={() => setToggleMenu(!toggleMenu)} className="border-l-4 border-gray-600">
                                Home
                            </Link>
                            {isUserActive?(<>
                                <Link onClick={handleLogout} className="border-l-4 border-gray-600">
                                Logout
                            </Link>
                            </>):(
                                <>
                                <Link to="/login" onClick={() => setToggleMenu(!toggleMenu)} className="border-l-4 border-gray-600">
                                Login
                            </Link>
                            <Link to="/signup" onClick={() => setToggleMenu(!toggleMenu)} className="border-l-4 border-gray-600">
                                Signup
                            </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;