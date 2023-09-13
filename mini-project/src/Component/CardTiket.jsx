import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CardTiket = () => {
  // DATA DARI API EVENT, USER_PEMBELI, USER_PENJUAL
  const [pembeliId, setPembeliId] = useState(localStorage.getItem("user_id"));
  const [input, setInput] = useState("");
  const [datas, setDatas] = useState(null);
  const [dataFilter, setDataFilter] = useState({
    kota_id: "",
    kategori_event_id: "",
    jenis_event: "",
  });

  const navigate = useNavigate();
  const getApi = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/event?kota_id=${dataFilter.kota_id}&kategori_event_id=${dataFilter.kategori_event_id}&jenis_event=${dataFilter.jenis_event}`
      );
      // console.log(res.data);
      setDatas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(userRef);
  const eventDetail = (id) => {
    if (pembeliId) {
      // console.log("ada");
      navigate(`/detailEvent/${id}`);
    } else {
      const login = toast.error("Login First");
      setTimeout(() => {
        toast.dismiss(login);
        navigate("/login");
      }, 2000);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  // console.log(datas);

  if (datas === null) {
    return <h1>LOADING</h1>;
  }

  const handleFilter = async (e) => {
    try {
      const newdataFilter = { ...dataFilter };
      newdataFilter[e.target.name] = e.target.value;
      setDataFilter(newdataFilter);
      const res = await axios.get(
        `http://localhost:3001/event?kota_id=${newdataFilter.kota_id}&kategori_event_id=${newdataFilter.kategori_event_id}&jenis_event=${newdataFilter.jenis_event}`
      );
      setDatas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(dataFilter);
  console.log(datas);
  return (
    <div>
      {/* pencarian */}
      <div className="grid md:w-3/4  m-auto px-5">
        <div className=" mt-10">
          <div className="mb-5 flex gap-5 md:gap-10">
            <div className="kota">
              <select
                name="kota_id"
                className="select select-bordered"
                onChange={handleFilter}
              >
                <option disabled selected>
                  Pilih Kota
                </option>
                <option value={1}>Jakarta</option>
                <option value={2}>Bogor</option>
                <option value={3}>Tangerang</option>
                <option value={4}>Bekasi</option>
                <option value={""}>All</option>
              </select>
            </div>
            <div className="kategori">
              <select
                name="kategori_event_id"
                className="select select-bordered"
                onChange={handleFilter}
              >
                <option disabled selected>
                  Pilih Kategori Event
                </option>
                <option value={1}>Anime</option>
                <option value={2}>Seni</option>
                <option value={3}>Olahraga</option>
                <option value={4}>Komedi</option>
                <option value={5}>Edukasi</option>
                <option value={""}>All</option>
              </select>
            </div>
            <div className="kategori">
              <select
                name="jenis_event"
                className="select select-bordered"
                onChange={handleFilter}
              >
                <option disabled selected>
                  Pilih Jenis Event
                </option>
                <option>online</option>
                <option>ofline</option>
                <option value={""}>All</option>
              </select>
            </div>
          </div>
          <h1 className="text-2xl font-semibold">
            Temukan judul event yang akan kamu cari
          </h1>
        </div>

        <div className=" mt-5 gap-5 flex relative z-0 w-full mb-6 group">
          <input
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Search Your Event
          </label>
        </div>

        <div className="flex flex-nowrap overflow-scroll gap-4 py-5">
          {datas
            .filter((value) => {
              if (input === "") {
                return value;
              } else if (
                value.nama_event
                  .toLocaleLowerCase()
                  .includes(input.toLocaleLowerCase())
              ) {
                return value;
              }
            })
            .map((value, index) => {
              return (
                <div
                  key={index}
                  className="hover:scale-110 hover:duration-1000 max-w-[250px] min-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    onClick={() => eventDetail(value.id)}
                    className="rounded-t-lg object-cover h-[150px]"
                    src={value.image_link}
                    alt="IMAGE"
                  />

                  <div className="p-2 flex flex-col">
                    <h5
                      onClick={() => eventDetail(value.id)}
                      className="block overflow-hidden mt-2 mb-2 h-10 text-xl font-semiboldbold tracking-tight text-gray-900 dark:text-white"
                    >
                      {value.nama_event}
                    </h5>
                    <code className=" block text-gray-700 dark:text-gray-400 text-xs">
                      {value.date}, {value.time}
                    </code>
                    <span className=" block overflow-auto mt-2 mb-2 h-9 text-sm font-light text-gray-700 dark:text-gray-400">
                      {value.kota}, {value.detail_lokasi}{" "}
                    </span>
                    <span className=" overflow-auto block mt-2 h-8 text-xs text-gray-700 dark:text-gray-400">
                    {value.deskripsi_singkat}
                    </span>
                    <span className="text-center font-serif text-sm">Created By : {value.user_id == pembeliId ? <span className="text-red-600">You</span> : value.pembuat_event}</span>
                    <span className=" font-normal text-gray-700 dark:text-gray-400">
                      {value.biaya == 0 ? (
                        <span className="flex justify-center text-green-500">
                          Free
                        </span>
                      ) : (
                        <span className="flex justify-center text-green-500">
                          Rp. {value.biaya.toLocaleString()}
                        </span>
                      )}
                    </span>
                    <span className="flex justify-center mt-5">
                      <Button
                        onClick={() => eventDetail(value.id)}
                        classname="bg-cyan-700 hover:bg-blue-500 text-white"
                      >
                        Show Detail
                      </Button>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CardTiket;

/*
                {value.discount === 0 ? (
                    <div></div>
                  ) : (
                    <div className="bg-red-600 flex items-center text-center justify-center rounded-full w-16 h-16">
                      <span className="flex text-center relative justify-center text-white font-medium">
                        {value.discount}%
                      </span>
                    </div>
                  )}
*/
