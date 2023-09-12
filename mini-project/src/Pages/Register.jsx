import React, { useEffect, useState } from 'react'
import Input from '../Component/Input'
import axios from 'axios'
import Button from '../Component/Button'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Register = () => {
    // const toast = Toaster()
    const navigate = useNavigate()
    const [datas, setDatas] = useState(null)
    const [input, setInput] = useState(
        {
            nama_lengkap : "",
            email : "",
            password : ""
        }
    )

    const getApi = async () => {
        try {
            const res = await axios.get("http://localhost:3004/users/register")
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:3001/users/register`, input)
            Swal.fire({
                icon: 'success',
                title: 'SELAMAT',
                text: res.data.message,
              })
            setInput({
                nama_lengkap : "",
                email : "",
                password : "",
            })
            navigate("/login")
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              })
        }
    }

    const handleChange = (e) => {
        const newInput = {...input}
        newInput[e.target.name] = e.target.value
        setInput(newInput)
    }

    return (
    <div className='flex justify-center min-h-screen items-center'>
        <Toaster />
        <div className='mx-5 w-full max-w-sm p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
            <form action="" onSubmit={onSubmit} className='space-y-6'>
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">Register</h5>
            <Input onChange={handleChange} value={input.nama_lengkap} type="text" name="nama_lengkap" placeholder="" >Nama Lengkap</Input>
            <Input onChange={handleChange} value={input.email} type="email" name="email" placeholder="" >Email</Input>
            <Input onChange={handleChange} value={input.password} name="password" type="password" placeholder="" >Password</Input>
            
            <Button classname="bg-blue-600 ">Register</Button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Have Account? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500"><Link to={'/login'}>Sign In</Link></a>
            </div>
            </form>
        </div>
        
    </div>

    )
}

export default Register
