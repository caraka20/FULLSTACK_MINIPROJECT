import React, { useEffect, useState } from 'react'
import Button from '../Component/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Ulasan = () => {

    const {eventId} = useParams()
    const [dataComment, setDataComment] = useState(null)
    const [bintang, setBintang] = useState(1)
    const [input, setInput] = useState(
        {
        eventId : eventId,
        userId : localStorage.getItem("userId"),
        comment: "",
        rate: 1
        })

        const handleBintang = (index) => {
            const stars = document.querySelectorAll('.flex svg');
            for (let i = 1; i <= index; i++) {
                stars[i].classList.add('bg-yellow-400');
            }
            setBintang(index)
            // console.log(input);
            }
        
        const removeBintang = (index) => {
            const stars = document.querySelectorAll('.flex svg');
            for (let i = 1; i <= index; i++) {
                stars[i].classList.remove('bg-yellow-400');
            }
        }

        const handleChange = (e) => {
            // console.log(e.target.value);
            const newInput = {...input}
            newInput[e.target.name] = e.target.value
            newInput["rate"] = bintang
            setInput(newInput)
        }

        const getDataComment = async () => {
            try {
                const res = await axios.get('http://localhost:3004/comments')
                setDataComment(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        const postComment = async () => {
            try {
                const res = await axios.post(`http://localhost:3004/comments`, input)
                console.log(`berhasil => ${res.data}`);
            } catch (error) {
                console.log(error);
            }
            setInput({
                comment: "",
            })
        }

        useEffect(()=> {
            getDataComment()
        },[])
console.log(`event id => ${eventId}`);
// console.log(dataComment);

  return (
    <div>
      <textarea onChange={handleChange} name="comment" value={input.comment} cols="30" rows="10"></textarea>
      <div className="flex items-center space-x-1 mb-10">
        <svg name='rate' value="1" onClick={()=>handleBintang(1)} className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg onClick={()=>handleBintang(2)} className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg onClick={()=>handleBintang(3)} className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg onClick={()=>handleBintang(4)} className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg onClick={()=>handleBintang(5)} className="w-6 h-6 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <span onClick={()=>removeBintang(5)} className='hover:cursor-pointer'>remove bintang</span>
      </div>
      <Button onClick={postComment} classname="bg-blue-500">Kirim</Button>
    </div>
  )
}

export default Ulasan
