import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Tiket = () => {
    // const [cetakTiket, setCetakTiket] = useState(null)
    const [localId, setLocalId] = useState(localStorage.getItem("user_id"))
    const [eventDiikuti, setEventDiikuti] = useState(null)

    const getData = async () => {
        try {
          // data user
          const respon = await axios.get(
            `http://localhost:3001/users/dashboard/${localId}`
          );
          // console.log(respon);
          setEventDiikuti(respon.data.eventDiikuti)
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(()=> {
        getData()
    }, [])

    if (!eventDiikuti) {
        return <></>
    }

  return (
    <div className='flex flex-nowrap overflow-scroll gap-4 py-5'>
        {
            eventDiikuti === null ? <h1>loading...</h1> :
            eventDiikuti.map((item, index) => {
                return (
                    <div className=' hover:duration-1000 max-w-[250px] min-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
                    <div className='p-4 flex flex-col justify-center items-center border border-black'>
                    <h1 className=' border-b-4 text-lg font-semibold'>TIKET PESERTA </h1>
                    <h1>{item.nama_event}</h1>
                    <h1>{item.detail_lokasi}, {item.kota}</h1>
                    <h1>{item.date}, {item.time}</h1>
                    <h1> {item.nama} </h1>
                    <h1 className='mb-3 text-red-500'> kode referensi : {item.kode_referal} </h1>
                    <Link  to={`/review/${item.event_id}`}><span className=" py-2 rounded mx-auto px-3 text-blue-700 hover:scale-125 hover:text-blue-400">Beri Ulasan &gt;&gt;&gt;</span></Link>
                  </div>
                  </div>
                )
            })
        }
    </div>
  )
}

export default Tiket
