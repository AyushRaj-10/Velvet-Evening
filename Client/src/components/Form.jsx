import React, { useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const Form = () => {


  const [Data, setData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Date: '',
    Time: '',
    Guest: '',
    Request: '',
    Preferred: '',
    Occasion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formHandler = async(e) => {
    e.preventDefault();
    try {
      const {
        Name,
        Email,
        Phone,
        Date,
        Time,
        Guest,
        Request,
        Preferred,
        Occasion,
      } = Data;

      const {data} = await axios.post("http://localhost:8000/reserve", {
        Name,
        Email,
        Phone,
        Date,
        Time,
        Guest,
        Request,
        Preferred,
        Occasion
      },{
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      console.log('Form Data:', Data);
      toast.success(data.message, {
        autoClose: 2000, // milliseconds
      });
  
      setData({
          Name: "",
          Email: "",
          Phone: "",
          Date: "",
          Time: "",
          Guest: "",
          Request: "",
          Preferred: "",
          Occasion: "",
        });
      
    } catch (error) {
      toast.error(error.response.data.message),{
        autoClose: 2000,
      };
    }

  };

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Zoom}
    />

      <div className="min-h-[90vh] w-[60vw] m-auto mt-10 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-lg p-8">
        <form onSubmit={formHandler} className="w-full flex flex-col gap-6 text-xl text-rose-200">
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="Name"
              value={Data.Name}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white placeholder-white/60"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label>Email Address:</label>
            <input
              type="email"
              name="Email"
              value={Data.Email}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white placeholder-white/60"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="Phone"
              value={Data.Phone}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white placeholder-white/60"
              placeholder="+91-9876543210"
            />
          </div>
          <div>
            <label>Reservation Date:</label>
            <input
              type="date"
              name="Date"
              value={Data.Date}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white"
            />
          </div>
          <div>
            <label>Reservation Time:</label>
            <input
              type="time"
              name="Time"
              value={Data.Time}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white"
            />
          </div>
          <div>
            <label>Number of Guests:</label>
            <input
              type="number"
              name="Guest"
              value={Data.Guest}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white"
              placeholder="2"
            />
          </div>
          <div>
            <label>Special Requests:</label>
            <input
              type="text"
              name="Request"
              value={Data.Request}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white placeholder-white/60"
              placeholder="e.g. Candlelight, Roses"
            />
          </div>
          <div>
            <label>Preferred Seating:</label>
            <input
              type="text"
              name="Preferred"
              value={Data.Preferred}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white placeholder-white/60"
              placeholder="Rooftop, Garden..."
            />
          </div>
          <div>
            <label>Occasion:</label>
            <input
              type="text"
              name="Occasion"
              value={Data.Occasion}
              onChange={handleChange}
              className="w-full mt-1 border border-white/20 bg-transparent rounded-md outline-none px-3 py-2 text-white placeholder-white/60"
              placeholder="Anniversary, First Date..."
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg transition duration-300"
          >
            Submit Reservation
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
