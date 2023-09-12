import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Component/Button";

const Reviewpage = () => {
  const { eventId } = useParams();
  const [idUser, setIdUser] = useState(localStorage.getItem("user_id"));
  const [dataComment, setDataComment] = useState(null);
  const [dataEvent, setDataEvent] = useState(null);
  const [bintang, setBintang] = useState(1);
  const [input, setInput] = useState({
    user_id: localStorage.getItem("user_id"),
    comment: "",
    rate: 1,
    event_id: eventId,
  });
  const [updateId, setUpdateId] = useState(0);
  const inputRef = useRef()

  const removeBintang = (index) => {
    const stars = document.querySelectorAll(".flex svg");
    for (let i = 1; i <= index; i++) {
      stars[i].classList.remove("bg-yellow-400");
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    const newInput = { ...input };
    newInput[e.target.name] = e.target.value;
    newInput["rate"] = bintang;
    setInput(newInput);
  };

  const handleBintang = (index) => {
    try {
    removeBintang(6)
    const stars = document.querySelectorAll(".flex svg");
    for (let i = 1; i <= index + 1; i++) {
      stars[i].classList.add("bg-yellow-400");
    }
    setBintang(index);
    // console.log(index);      
    } catch (error) {
      console.log(error);
    }

  };
  
  const getDataComment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/event/komentar/${eventId}`
      );
      // console.log(res.data);
      setDataComment(res.data.dataComent);
      setDataEvent(res.data.dataEvent);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      if (updateId == 0) {
        const res = await axios.post(`http://localhost:3001/event/komentar`, {
          ...input,
          user_id: localStorage.getItem("user_id"),
          event_id: eventId,
        });
        removeBintang(6);
        console.log(res);
        getDataComment();
        toast.success(res.data.message);
      } else {
        const respon = await axios.put(
          `http://localhost:3001/event/komentar/${updateId}`,
          {
            ...input,
            user_id: localStorage.getItem("user_id"),
            event_id: eventId,
          }
        );
        removeBintang(6);
        console.log(respon);
        getDataComment();
        setUpdateId(0)
        toast.success(respon.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setInput({
      comment: "",
    });
  };

  const editComent = async (id) => {
    try {
      inputRef.current.focus();
      const res = dataComment.find((item) => {
        return item.id == id;
      });
      removeBintang(6)
      handleBintang(res.rate)
      setUpdateId(res.id);
      const newInput = { ...input };
      setInput({ ...newInput, comment: res.comment, rate: res.rate });
    } catch (error) {
      console.log(error);
    }
  };

const deleteComent = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3001/event/komentar/${id}`)
    getDataComment()
    toast.success(res.data.message)
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    getDataComment();
  }, []);

  return (
    <>
      <Toaster />
      <div className=" bg-gradient-to-b from-cyan-700 to-blue-600 ">
        <div className="mx-20">
          <div className=" text-white bg-gradient-to-b from-cyan-700">
            <h1>
              <b> {dataEvent ? dataEvent.nama_event : <></>}</b>
            </h1>
          </div>
          <div className="text-white">
            <h4>
              <i>Did you enjoy the event? Leave us a short review!</i>
            </h4>
          </div>
          {/* <Inputs /> */}
          <textarea
          ref={inputRef}
            onChange={handleChange}
            name="comment"
            value={input.comment}
            className="border border-black h-[200px] w-3/4"
          />
          <div className="text-white">
            Was it worth it? Please rate the event also!
          </div>
          <div className="flex items-center space-x-1 mb-10">
            <svg
              name="rate"
              value="1"
              onClick={() => handleBintang(1)}
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              onClick={() => handleBintang(2)}
              className="w-6 h-6 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              onClick={() => handleBintang(3)}
              className="w-6 h-6 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              onClick={() => handleBintang(4)}
              className="w-6 h-6 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              onClick={() => handleBintang(5)}
              className="w-6 h-6 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span
              onClick={() => removeBintang(6)}
              className="m-5 p-2 bg-red-400 rounded hover:cursor-pointer"
            >
              remove bintang
            </span>
          </div>
          {/* <Stars astarcss/> */}
          <button
            className="bg-slate-400 p-2 mb-2 rounded-md"
            onClick={postComment}
          >
            Submit
          </button>
        </div>
      </div>

      {!dataComment ? (
        <></>
      ) : (
        dataComment.map((item) => {
          return (
            <div className=" rounded-lg shadow-lg chat chat-start mx-10 my-10 grid justify-between gap-3 items-center border border-slate-500 py-2">
              <div className="grid ml-10 ">
                <div className="w-auto rounded-full ">
                  <img
                    className="w-10"
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"
                  />
                </div>
                <span className="">
                  {item.user_id == idUser ? (
                    <span>You</span>
                  ) : (
                    item.pemberi_komentar
                  )}
                </span>
                <span className="flex gap-2">
                  <svg
                    className="w-8 h-8 text-gray-300 dark:text-yellow-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill=""
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  {item.rate}
                </span>
              </div>
              <div className="chat-bubble">{item.comment}</div>

              {idUser == item.user_id ? (
                <>
                  <div className="mx-5">
                    <Button
                      onClick={() => editComent(item.id)}
                      classname="bg-blue-600"
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="w-auto">
                    <Button onClick={() => deleteComent(item.id)} classname="bg-red-600">Hapus</Button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default Reviewpage;
