import { Route, Routes, useParams } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/HomePage";
import Nav from "./Component/Nav";
import CreateEvent from "./Pages/CreateEvent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailEvent from "./Component/DetailEvent";
import Dashboard from "./Pages/Dashboard";
import Ulasan from "./Pages/Ulasan";
import EventDetail from "./Pages/EventDetail";
import Tiket from "./Component/Tiket";
import FooterWithSocialMediaIcons from "./Component/Footer";
import Reviewpage from "./Pages/Reviewpage";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import Auth from "./Pages/Auth";

function App() {
  // const {eventId} = useParams()
  const navigate = useNavigate();
  const [localId, setLocalId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_id");
    if (storedUser) {
      setLocalId(storedUser);
    }
  }, []);

  // hanlde logout
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setLocalId(null);
    navigate("/");
    alert("anda berhasil log out");
  };

  // console.log(dataLocal);
  const onLogin = async (email, password) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/users/login?email=${email}&password=${password}`
      );
      setLocalId(res.data.data.id);
      Swal.fire({
        icon: "success",
        title: "SELAMAT",
        text: res.data.message,
      });
      setTimeout(() => {
        localStorage.setItem("user_id", res.data.data.id);

        navigate("/");
      }, 3000);

      // toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      // toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Toaster />
      <div>
        <Nav pengguna={localId} />
      </div>

      <Routes>
        <Route path="/auth/:token" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/:user_id"
          element={<Dashboard onClick={handleLogout} />}
        />
        <Route path="/login" element={<Login onClick={onLogin} />} />
        <Route path="/review/:eventId" element={<Reviewpage />} />
        <Route path="/ulasan/:eventId" element={<Ulasan />} />
        <Route path="/detailEvent/:idEvent" element={<EventDetail />} />
        <Route
          path="/create_event"
          element={<CreateEvent pengguna={localId} />}
        />
      </Routes>

      <div className="">
        <FooterWithSocialMediaIcons />
      </div>
    </>
  );
}

export default App;
