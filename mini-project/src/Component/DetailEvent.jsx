


//INI TIDAK DIPAKAI





import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Button from './Button'

const DetailEvent = () => {
// const {eventId} = props
const navigate = useNavigate()
const [localId, setLocalId] = useState(localStorage.getItem("user_id"))
const {eventId} = useParams()
const [data, setDatas] = useState("")
    const getApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/event/detailEvent/${eventId}`)
            // const searchParam = useParams.get("eventId")
            setDatas(res.data)
            console.log(res.data);
        } catch (error) {
          console.log(error);
        }
    }
    const [pembeliId, setPembeliId] = useState(
        localStorage.getItem("userId")
      )
      const [dataEvent, setDataEvent] = useState(null)
      const [input, setInput] = useState("")
    
        // const [datas, setDatas] = useState(null)

    useEffect(()=> {
        getApi()
        
    },[])

    const onBuy = async (e) => {
        try {

        if (localId) {
         // ini id event (e)
        console.log(e);
        const codeReferal = prompt("masukan kode referal, jika tidak ada masukan angka 0") // kasih promp yang berisi kode referal
        // const namaLengkap = prompt("Masukan Nama Lengkap")
        // const email = prompt("Masukan alamat email")
        // get data event 
        const dataIpen = await axios.get(`http://localhost:3004/events?id=${e}`)
        setDataEvent(dataIpen.data[0])
    
        // harga tiket/data tiket
        const getHarga = await axios.get(`http://localhost:3004/events?id=${e}`)
        const harga = getHarga.data[0].biaya
        const dataEvent = getHarga.data[0]
        // console.log(dataTiket);
        // console.log(harga);
    
        // cari data tiket dengan kode referalyg sesuai dengan yg dimasukan promp
        const res = await axios.get(`http://localhost:3004/cetak_tiket?kode_referal=${codeReferal}`)
        console.log(res);; // orang yg punya kode referal
    
        // di cek apakah data yg punya referal code nya ada, kalo ada maka apa yg bakal dilakuin
        if (res.data.length !== 0) {
    
        // ambil data pemilik kode referal
        const pemilikReferal = await axios.get(`http://localhost:3004/users?id=${res.data[0].userId}`)
        const dataPemilikReferal = pemilikReferal.data[0];
    
        // ambil data pembeli
        const dataPembeli = await axios.get(`http://localhost:3004/users?id=${pembeliId}`)
        const userBeli = dataPembeli.data[0]
        console.log(userBeli);
    
        // setelah membeli akan mengurangi saldo dan menambah point si pembeli
        const resForBuyer = {...userBeli, saldo : userBeli.saldo - harga, point : userBeli.point + 1}
        const updatePembeli = await axios.put(`http://localhost:3004/users/${pembeliId}`, resForBuyer) // update saldo dama point kalo pembeli berhasil membeli menggunakan referensi code
        // console.log(updatePembeli.data);
    
        // setelah membeli akan menambah point bagi si pemilik kode referal
        const resPemilikRef = {...dataPemilikReferal, point : dataPemilikReferal.point + 1}
        const hasilnya = await axios.put(`http://localhost:3004/users/${dataPemilikReferal.id}`, resPemilikRef)
        console.log(hasilnya.data)
    
        // mengurangi maksimum peserta pada event
        const newDataEvent = {...dataEvent, max_peserta: dataEvent.max_peserta - 1}
        // console.log(newDataEvent);
        const postEvent = await axios.put(`http://localhost:3004/events/${e}`, newDataEvent)
    
        // post data tiket yang sudah dibeli
        // ambil 6 angka acak untuk mendapatkan code random
        function getRandomCode() {
          let result = '';
          for (let i = 0; i < 6; i++) {
            const randomDigit = Math.floor(Math.random() * 10);
            result += randomDigit;
          }
          return result;
        }
    
        const dataTiket = {
          userId: pembeliId,
          eventId: e,
          kode_referal: getRandomCode()
        }
    
        // post dataTiket ke properti cetak_tiket
        const postTiket = await axios.post(`http://localhost:3004/cetak_tiket`, dataTiket)
        console.log(postTiket.data);
        } 
    
        else {
          alert("maaf kode tidak valid");
        // ambil data pembeli
        const dataPembeli = await axios.get(`http://localhost:3004/users?id=${pembeliId}`)
        const userBeli = dataPembeli.data[0]
        console.log(userBeli);
    
        // setelah membeli akan mengurangi saldo dan menambah point si pembeli
        const resForBuyer = {...userBeli, saldo : userBeli.saldo - harga}
        const updatePembeli = await axios.put(`http://localhost:3004/users/${pembeliId}`, resForBuyer)
        console.log(updatePembeli.data);
    
        // mengurangi maksimum peserta pada event
        const newDataEvent = {...dataEvent, max_peserta: dataEvent.max_peserta - 1}
        // console.log(newDataEvent);
        const postEvent = await axios.put(`http://localhost:3004/events/${e}`, newDataEvent)
    
        // ambil 6 angka acak untuk mendapatkan code random
        function getRandomCode() {
          let result = '';
          for (let i = 0; i < 6; i++) {
            const randomDigit = Math.floor(Math.random() * 10);
            result += randomDigit;
          }
          return result;
        }
    
        const dataTiket = {
          userId: pembeliId,
          eventId: e,
          kode_referal: getRandomCode()
        }
    
        // post dataTiket ke properti cetak_tiket
        const postTiket = await axios.post(`http://localhost:3004/cetak_tiket`, dataTiket)
        console.log(postTiket.data);
        alert("selamat anda berhasil membeli tiket")
      }
        } else {
            alert("silahkan login dulu sebelum membeli")
            navigate("/login")
        }
        } catch (error) {
          
        }
    
    }

    const buyPoint = async (e) => {
        try {

    if (localId) {
                // ini id event (e)
                alert(`selamat anda berhasil membeli tiket dengan point`)
                console.log(e);
                // harga tiket/data tiket
              const dataIpen = await axios.get(`http://localhost:3004/events?id=${e}`)
              const dataEvent = dataIpen.data[0]
              // console.log(dataTiket);
              // console.log(harga);
          
              // data pembeli
              const dataPembeli = await axios.get(`http://localhost:3004/users?id=${pembeliId}`)
              const userBeli = dataPembeli.data[0]
              console.log(userBeli);
          
              // setelah membeli akan mengurangi point si pembeli
              const resForBuyer = {...userBeli, point : userBeli.point - 1}
              const updatePembeli = await axios.put(`http://localhost:3004/users/${pembeliId}`, resForBuyer) // update saldo dama point kalo pembeli berhasil membeli menggunakan referensi code
              console.log(updatePembeli.data);
          
                  // mengurangi maksimum peserta pada event
                  const newDataEvent = {...dataEvent, max_peserta: dataEvent.max_peserta - 1}
                  // console.log(newDataEvent);
                  const postEvent = await axios.put(`http://localhost:3004/events/${e}`, newDataEvent)
                  console.log(postEvent.data);
            
                // post data tiket yang sudah dibeli
                // ambil 6 angka acak untuk mendapatkan code random
                function getRandomCode() {
                  let result = '';
                  for (let i = 0; i < 6; i++) {
                    const randomDigit = Math.floor(Math.random() * 10);
                    result += randomDigit;
                  }
                  return result;
                }
            
                const dataTiket = {
                  userId: pembeliId,
                  eventId: e,
                  kode_referal: getRandomCode()
                }
            
                // post dataTiket ke properti cetak_tiket
                const postTiket = await axios.post(`http://localhost:3004/cetak_tiket`, dataTiket)
                console.log(postTiket.data);
    } else {
        alert("silahkan login dulu sebelum membeli")
        navigate("/login")
    }

      } catch (error) {
        console.log(error);
      }
    }

// console.log(data);
  return (
    <div>
      {/* <div className='border-b-2'>
      <section className="grid object-cover bg-center bg-no-repeat bg-[url('https://static.vecteezy.com/system/resources/previews/000/692/604/original/party-crowd-banner-design-vector.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          
        </div>
      </section>        
      </div>

    <div className='border border-slate-600'>
    <div className='grid  mx-28 mt-10'>
        <div className='flex flex-col md:flex-row gap-5 md:flex-cols-3 justify-between'>
            <div className='text-lg'>{data.kategori_event}</div>
            <div className='text-6xl font-bold font-sans'>{data.nama_event}</div>
            <div>{data.jenis_event}</div>
        </div>
    </div>

    <div className='grid mx-28 my-10 '>
        <div className='grid '>
            <div className='text-2xl font-bold'>Deskripsi</div>
            <div>{data.deskripsi_singkat}</div>
            <div className=''>{data.deskripsi_detail}</div>
        </div>
    </div>
    </div>

<div className='border border-slate-600'>
    <div className='grid mx-28 my-10 '>
        <div className='grid'>
            <div className='mb-10 text-4xl font-bold font-sans'>Location And Time</div>
            <div className='grid'>
                <span>{data.date}</span>
                <span>Acara Dimulai : {data.time} - sd</span>
                <span>{data.detail_lokasi}, {data.kota}</span>
            </div>
        </div>
    </div>
</div>

<div className='border border-slate-600 '>
    <div className='grid mx-28 mt-10'>
        <span className=" font-normal text-gray-700 dark:text-gray-400">
            {data.discount === 0 ? 
            <div className='text-green-500 font-bold text-4xl flex justify-center align-middle items-center h-40'><span>Rp. {data.biaya}</span></div> : 

            <span className='grid gap-5 md:grid-cols-2 justify-between '>
                <div className='grid align-middle justify-center'>
                    <span>Before</span>
                    <del className='text-red-500 font-bold text-4xl'>Rp. {data.biaya}</del>   
                </div>

                <div className='grid align-middle justify-center'>
                    <span >After</span>
                    <span className='text-green-500 font-bold text-4xl'>Rp. {(data.biaya - (data.discount/100 * data.biaya))}</span>
                    <span>{data.discount}% Discount</span>
                </div>
            </span>}  
        </span>
    </div>

    <div className='grid mx-28 my-10'>
        <div className='grid gap-5 justify-center align-middle md:grid-cols-2'>
            <Button onClick={(e)=>onBuy(data.id)} classname="bg-blue-500">Buy Now</Button>
            <Button onClick={(e)=>buyPoint(data.id)} classname="bg-green-400">Buy With Point</Button>
        </div>
    </div>
    </div> */}

    </div>
  )
}

export default DetailEvent
