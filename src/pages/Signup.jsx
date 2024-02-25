import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input';
import Button from '../components/Button';
import {useForm} from "react-hook-form"
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const Signup = () => {
    const [error, setError] = useState("");
    const {register,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }



    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">

                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Create a new account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have a account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                       Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            type="text"
                            label="Full Name: "
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            type="text"
                            label="Email: include @your.com"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            type="password"
                            label="Password: must be at least 8 characters "
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup