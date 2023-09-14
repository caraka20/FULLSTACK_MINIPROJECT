import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import Button from "../../Components/Button/Button";
import Form from "../Component/FormGrup";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Component/Button";
import Swal from "sweetalert2";

const EventDetail = () => {
  const navigate = useNavigate();
  const { idEvent } = useParams(); // get event Id
  const [dataEvent, setDataEvent] = useState(null); //
  const [dataUser, setDataUser] = useState(null); // all data user
  const [idUser, setidUser] = useState(localStorage.getItem("user_id")); // localstorage user
  const [buySaldo, setBuySaldo] = useState({
    event_id: idEvent,
    user_id: idUser,
    kode_referal: "",
  });
  const [buyPoint, setBuyPoint] = useState({
    event_id: idEvent,
    user_id: idUser,
  });
  const [hargaDiscount, setHargaDiscount] = useState(0);
  const [disbaleBtn, setDisableBtn] = useState(false);
  // const [message, setMessage] = useState("")

  const reff = useRef();
  console.log(buySaldo);
  const getApi = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/event/detailEvent?user_id=${idUser}&event_id=${idEvent}`
      ); //get  Event Id
      setDataEvent(res.data.dataEvent);
      setDataUser(res.data.dataUser);
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  const cekReferal = async (referal) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/event/aplyReferal?kode_referal=${referal}&idEvent=${idEvent}&idUser=${idUser}`
      );
      toast.success(res.data.message);
      const newData = { ...buySaldo };
      newData.kode_referal = referal;
      setBuySaldo(newData);
      setHargaDiscount(
        dataEvent.biaya - dataEvent.biaya * (dataEvent.discount / 100)
      );
      setDisableBtn(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleBuySaldo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/event/buyWithSaldo",
        buySaldo
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "SELAMAT",
        text:
          res.data.message +
          "saldo berkurang " +
          (hargaDiscount !== 0
            ? hargaDiscount.toLocaleString()
            : dataEvent.biaya.toLocaleString()),
      });
      setDisableBtn(false);
      getApi();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleBuyPoint = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/event/buyWithPoint",
        buyPoint
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "SELAMAT",
        text: res.data.message,
      });
      getApi();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  if (!dataEvent) {
    return <></>;
  }

  return (
    <>
      <div className="md:px-[100px] px-[10px] mt-[50px] ">
        <img
          className="w-full h-[200px] md:h-[500px] object-fill"
          src={dataEvent.image_link}
          alt={dataEvent.nama_event}
        />
        <div className="w-full border-b-[5px]">
          <div className=" mt-[40px] mb-[50px] w-full ">
            <h1 className="text-6xl ">{dataEvent.nama_event}</h1>
          </div>
        </div>

        <div className=" p-[50px] md:flex-row gap-5 flex mt-[20px] justify-between bg-cyan-700 rounded-3xl">
          <div className="">
            <h1 className=" text-xl text-white ">{dataEvent.kota}</h1>
            <h1 className="text-white">{dataEvent.detail_lokasi}</h1>
          </div>
          <div className="">
            <h1 className="text-xl text-white">{dataEvent.date}</h1>
            <h1 className="text-xl text-white">{dataEvent.time}</h1>
          </div>
        </div>
        <div className="mb-[50px]">
          <h1 className="mt-[50px] text-xl mb-[50px]">Description</h1>
          <h1 className="text-zinc-500">{dataEvent.deskripsi_detail}</h1>
        </div>

        {dataEvent.user_id == idUser ? (
          <></>
        ) : dataEvent.biaya === 0 ? (
          <div></div>
        ) : (
          <>
            <Form
              labelName="Referal Code :"
              labelFor="token"
              inputId="token"
              ref={reff}
              inputcss="w-full mt-[10px]"
            />
            <Button
              classname="w-full bg-cyan-700 rounded-xl text-white font-bold mt-0 mb-[50px]"
              onClick={() => cekReferal(reff.current.value)}
              disabled={disbaleBtn}
            >
              Apply Refferal
            </Button>
          </>
        )}

        {dataEvent.biaya == "0" ? <div></div> : null}

        <div className="mt-[50px] mb-[30px] flex justify-between items-center">
          <h1 className="text-xl">Price :</h1>
          <div className="grid">
            {hargaDiscount != 0 ? (
              <div className="">
                <h1 className="text-xl text-red-600">
                  <del>{dataEvent.biaya.toLocaleString()}</del>
                </h1>
                <h1 className="text-xl text-green-600">
                  {hargaDiscount.toLocaleString()}
                </h1>
              </div>
            ) : dataEvent.biaya == 0 ? (
              <h1 className="text-xl text-green-600">Free</h1>
            ) : (
              <div className="">
                <h1 className="text-xl text-green-600">
                  {dataEvent.biaya.toLocaleString()}
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <h1>Seat Left :</h1>
          <h1>{dataEvent.max_peserta}</h1>
        </div>

        {dataEvent.user_id == idUser ? (
          <></>
        ) : (
          <div>
            <div>
              <div className="flex justify-between  items-center border-t-[3px] mb-[20px] mt-[75px]">
                <h1>Saldo :</h1>
                <h1>
                  {" "}
                  <span>Rp. {dataUser.saldo.toLocaleString()}</span>
                </h1>
              </div>
              <div className="flex justify-between  items-center  mb-[20px]">
                <h1>Points :</h1>
                <h1>{dataUser.point}</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              {dataEvent.biaya == 0 ? (
                <Button
                  classname="w-full bg-cyan-700 rounded-xl text-white font-bold mt-0 mb-[50px]"
                  onClick={handleBuySaldo}
                  // disabled={disbaleBtn}
                >
                  Buy
                </Button>
              ) : (
                <>
                  <Button
                    classname="w-full bg-cyan-700 rounded-xl text-white font-bold mt-0 mb-[50px]"
                    onClick={handleBuySaldo}
                    // disabled={disbaleBtn}
                  >
                    Buy By Saldo
                  </Button>
                  <Button
                    classname="hover:bg-cyan-700   w-full hover:text-white  rounded-xl border-cyan-700  border-[2px] text-black font-bold mt-0 mb-[50px]"
                    onClick={handleBuyPoint}
                    // disabled={disbaleBtn}
                  >
                    Buy Dengan 3 Point
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default EventDetail;
