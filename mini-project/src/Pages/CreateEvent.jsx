import React, { useState } from "react";
import Input from "../Component/Input";
import { Button } from "flowbite-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const CreateEvent = (props) => {
  const [disable, setDisable] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"))
  const [input, setInput] = useState({
    nama_event: "",
    date: "",
    time: "",
    biaya: "",
    image_link: "",
    max_peserta: 0,
    deskripsi_singkat: "",
    deskripsi_detail: "",
    discount: 0,
    detail_lokasi: "",
    kota_id: null,
    kategori_event_id: null,
    jenis_event: "",
    user_id: userId,
  });

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      console.log(input);
      if (
        input.nama_event == "" ||
        input.image_link == "" ||
        input.detail_lokasi == "" ||
        input.deskripsi_singkat == "" ||
        input.date == "" ||
        input.time == "" ||
        input.biaya < 0 ||
        input.max_peserta <= 0 ||
        input.kategori_event_id == null ||
        input.kota_id == null ||
        input.jenis_event == "" ||
        input.deskripsi_detail == ""
      ) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Harus Lengkap",
        });
      }

      const res = await axios.post(`http://localhost:3001/event/createEvent`, {
        ...input,
      });
      // toast.success(res.data.message)
      Swal.fire({
        icon: "success",
        title: "Selamat . . .",
        text: res.data.message,
      });
      setInput({
        nama_event: "",
        date: "",
        time: "",
        biaya: "",
        image_link: "",
        max_peserta: 0,
        deskripsi_singkat: "",
        deskripsi_detail: "",
        discount: 0,
        detail_lokasi: "",
        kategori_event_id: null,
        kota_id : null,
        jenis_event: "",
      });
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      // toast.error(error.response.data.message)
    }
  };

  const handleChange = (e) => {
    // console.log(userId);
    const newInput = { ...input };
    newInput["user_id"] = localStorage.getItem("user_id")
    if (input.biaya == null || input.biaya == 0) {
      newInput["discount"] = "";
      setInput(newInput);
      if (e.target.name !== "discount") {
        newInput[e.target.name] = e.target.value;
        setInput(newInput);
      } else if (e.target.name == "discount") {
        newInput["discount"] = "";
        setInput(newInput);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tidak Bisa Mengisi Discount Jika Biaya 0 Atau Tidak Terisi",
        });
      }
    } else if (input.biaya !== "") {
      newInput[e.target.name] = e.target.value;
      setInput(newInput);
    }
    if (
      e.target.name == "biaya" ||
      e.target.name == "discount" ||
      e.target.name == "max_peserta"
    ) {
      if (e.target.value < 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tidak Boleh Kurang Dari 0",
        });
        const newInput = { ...input };
        newInput[e.target.name] = "";
        setInput(newInput);
      }
    }
  };
  console.log(input);
  return (
    <div className="">
      <Toaster />
      <div className="border md:px-40 flex flex-col py-10">
        <span className="text-4xl m-auto font-bold justify-center items-center align-middle">
          Create Your Event{" "}
        </span>
        <form
          action=""
          className="rounded-lg shadow-gray-500 py-10 px-16 grid md:grid-cols-2 gap-3"
        >
          <Input
            required
            onChange={handleChange}
            value={input.nama_event}
            type="text"
            name="nama_event"
            placeholder=""
          >
            Nama Event
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.image_link}
            type="text"
            name="image_link"
            placeholder=""
          >
            Image Link
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.detail_lokasi}
            name="detail_lokasi"
            type="text"
            placeholder=""
          >
            Detail Lokasi
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.deskripsi_singkat}
            type="text"
            name="deskripsi_singkat"
            placeholder=""
          >
            Deskripsi Singkat
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.date}
            type="date"
            name="date"
            placeholder=""
          >
            Tangga Acara
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.time}
            type="time"
            name="time"
            placeholder=""
          >
            Time
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.biaya}
            type="number"
            name="biaya"
            placeholder=""
          >
            Biaya <span>(masukan angka 0 jika free)</span>
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.max_peserta}
            type="number"
            name="max_peserta"
            placeholder=""
          >
            Maxsimum Peserta
          </Input>
          <Input
            required
            onChange={handleChange}
            value={input.discount}
            type="number"
            name="discount"
            placeholder=""
          >
            Discount
          </Input>

          <select
            required
            onChange={handleChange}
            name="kategori_event_id"
            className="mb-6 text-sm border rounded w-full text-slate-700 placeholder:opacity-50"
          >
            <option disabled selected>Kategori Event</option>
            <option value="1">Anime</option>
            <option value="2">Seni</option>
            <option value="3">Olahraga</option>
            <option value="4">Komedi</option>
            <option value="5">Edukasi</option>
          </select>

          <select
            required
            onChange={handleChange}
            name="kota_id"
            className="mb-6 text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
          >
            <option disabled selected>Pilih Kota</option>
            <option value="1">Jakarta</option>
            <option value="2">Bogor</option>
            <option value="3">Tangerang</option>
            <option value="4">Bekasi</option>
          </select>

          <select
            required
            onChange={handleChange}
            name="jenis_event"
            className="mb-6 text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
          >
            <option disabled selected>Online / Ofline</option>
            <option value="online">Online</option>
            <option value="ofline">Ofline</option>
          </select>

          <textarea
            required
            onChange={handleChange}
            value={input.deskripsi_detail}
            name="deskripsi_detail"
            placeholder="deskripsi detail"
            className="h-40"
          >
            Deskripsi Detail
          </textarea>
          <Button onClick={onCreate}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
