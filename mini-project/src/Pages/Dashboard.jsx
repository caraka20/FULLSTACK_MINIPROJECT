import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { Rating } from "flowbite-react";
import Tiket from "../Component/Tiket";
import { Rating } from "flowbite-react";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [localId, setLocalId] = useState(localStorage.getItem("user_id")); // id dari localstorage
  const [dataUser, setDataUser] = useState(null); // data user dari local storage
  const [eventDiikuti, setEventDiikuti] = useState(null) // data event yg diikuti / tiket
  const [eventDibuat, setEventDibuat] = useState(null)
  const [rate, setRate] = useState(null);
  const [dataComment, setDataComent] = useState(null)

  const getData = async () => {
    try {
      const respon = await axios.get(
        `http://localhost:3001/users/dashboard/${localId}`
      );
      // console.log(respon);
      setDataUser(respon.data.dataUser);
      setDataComent(respon.data.dataComment);
      setEventDiikuti(respon.data.eventDiikuti)
      setEventDibuat(respon.data.dataEventDibuat)



// ambil data komment yang ada di event yg dibuatnya
const rating = [];

respon.data.dataEventDibuat
  .map((item) => respon.data.dataComment.filter((res) => res.event_id == item.id))
  .filter((item) => item.map((res) => rating.push(res.rate)));
// console.log(dataComent);
// console.log(rating);
const rateBintang = {
  lima: 0,
  empat: 0,
  tiga: 0,
  dua: 0,
  satu: 0,
};

for (let i = 0; i < rating.length; i++) {
  if (rating[i] == 4) {
    rateBintang.empat = Math.ceil(
      rateBintang.empat + (1 / rating.length) * 100
    );
  } else if (rating[i] == 3) {
    rateBintang.tiga = Math.ceil(
      rateBintang.tiga + (1 / rating.length) * 100
    );
  } else if (rating[i] == 5) {
    rateBintang.lima = Math.ceil(
      rateBintang.lima + (1 / rating.length) * 100
    );
  } else if (rating[i] == 2) {
    rateBintang.dua = Math.ceil(
      rateBintang.dua + (1 / rating.length) * 100
    );
  } else if (rating[i] == 1) {
    rateBintang.satu = Math.ceil(
      rateBintang.satu + (1 / rating.length) * 100
    );
  }
}
// console.log(rateBintang);
setRate(rateBintang);
    } catch (error) {
      console.log(error);
    }
  };

  const eventDetail = (id) => {
    navigate(`/detailEvent/${id}`);
  };

  // console.log(eventDibuat);
  // console.log(dataUser);
  // console.log(eventDiikuti);

  useEffect(() => {
    getData();
  }, []);


  if (!eventDibuat || !eventDiikuti || !dataUser) {
    return <></>
  }
  return (
    <div className="mt-10">
      
        <div className="grid md:grid-cols-2 md:w-3/4 justify-center w-full items-center m-auto ">
          
          {/* profile */}
          <div className="flex  justify-center w-full">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              
              <div className="flex flex-col items-center py-10 px-28">
                <svg
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {dataUser.nama_lengkap}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {dataUser.saldo.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Point : {dataUser.point.toLocaleString()}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <button
                    onClick={props.onClick}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-red-500 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end profile */}

          {/* start rate */}
          <div className="mt-10 h-full md:mt-0 grid md:ml-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex h-full flex-col justify-center px-10 ">
              <h1 className="items-center mb-5 text-lg font-semibold inline">
                {" "}
                Totat Rate Yang Didapat
              </h1>
              <Rating.Advanced className="mb-2" percentFilled={rate.lima}>
                <p>5 star</p>
              </Rating.Advanced>
              <Rating.Advanced className="mb-2" percentFilled={rate.empat}>
                <p>4 star</p>
              </Rating.Advanced>
              <Rating.Advanced className="mb-2" percentFilled={rate.tiga}>
                <p>3 star</p>
              </Rating.Advanced>
              <Rating.Advanced className="mb-2" percentFilled={rate.dua}>
                <p>2 star</p>
              </Rating.Advanced>
              <Rating.Advanced className="mb-2" percentFilled={rate.satu}>
                <p>1 star</p>
              </Rating.Advanced>
            </div>
          </div>
          {/* end rate */}

        </div>

        
        <div className="grid md:w-3/4 m-auto px-5">

        {/* event yg diikuit start*/}
        <div className="mt-10 grid">
          <div className="grid">
            <h1 className="text-4xl font-bold">Event Yang Anda Ikuti</h1>
            <div className="flex flex-nowrap overflow-scroll">
              <div className="flex flex-nowrap overflow-scroll gap-4 py-5">
                <Tiket />
              </div>
            </div>
          </div>
        </div>
        {/* event yg diikuti end */}

        {/* table event dibuat start */}
        <div className="mt-5" >
          <h1 className="text-4xl font-bold">Event Yang dibuat</h1>
          <div className="mt-8 ">
            <div className="h-96 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Nama Event
                    </th>
                    <th scope="col" className="">
                      Tiket Tersisa
                    </th>
                    <th scope="col" className="">
                      Terjual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventDibuat.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4">{index + 1}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          <Link to={`/review/${value.id}`}>{value.nama_event}</Link>
                        </th>
                        <td className="px-4 py-2">
                          {value.max_peserta}
                        </td>
                        <td className="px-4 py-2">
                          {value.terjual}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* table event dibuat end */}
        
        </div>

    </div>
  );
};

export default Dashboard;
