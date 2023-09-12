import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const Auth = () => {

    const {token} = useParams()
    const code = useRef()
    const kirimCode =  async () => {
        try {
            const res = await axios.put(`http://localhost:3001/users/auth`, {code : code.current.value, token:token})
            console.log(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='border border-slate-500 px-6 py-5 h-screen'>
      <div className='gap-5 grid bg-cyan-400 h-full justify-center items-center align-middle '>
        <div className='grid gap-5 justify-center'>
        <div className='w-[260px]'>
        <input ref={code} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
         <button onClick={kirimCode} className="btn btn-active btn-secondary inline-block m-auto w-1/2 items-center">Secondary</button>
      </div>
      </div>

      {/* <input></input>
      <input></input>
      <input></input>
      <input></input>
      <button onClick={gdjaj}></button> */}

      {/* <form action="" onSubmit={skhdajk}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button type='submit'>klik</button>
      </form> */}
     
    </div>
  )
}

export default Auth
