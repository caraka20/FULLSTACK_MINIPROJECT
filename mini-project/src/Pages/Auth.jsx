import axios from 'axios'
import React, { useRef, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom'

const Auth = () => {

    const navigate = useNavigate()
    const {token} = useParams()
    const code = useRef()
    const kirimCode =  async () => {
        try {
            const res = await axios.put(`http://localhost:3001/users/auth`, {code : code.current.value, token:token})
            toast.success(res.data.message);
            setTimeout(() => {
                navigate("/login")
            }, 3000);
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className='border border-slate-500 px-6 py-5 h-screen'>
        <Toaster />
      <div className='gap-5 grid h-full justify-center items-center align-middle '>
        <div className='grid gap-5 justify-center'>
        <div className='w-[260px]'>
        <input ref={code} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
         <button onClick={kirimCode} className="btn btn-active btn-primary inline-block m-auto w-1/2 items-center">Submit</button>
      </div>
      </div>
     
    </div>
  )
}

export default Auth
