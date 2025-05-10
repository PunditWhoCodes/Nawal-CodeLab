import React, { useState } from "react";
import { call, fb, insta, map, sms, twitter, yt } from "../assets/icons";
import cube from '../assets/images/cube.png'
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    textarea: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', textarea: '' });
  };
  return (
    <>
      <section
        id="contact"
        className="w-full bg-slate-200 flex flex-col lg:flex-row gap-10 lg:gap-20 h-fit p-4 lg:p-20 justify-center items-center"
      >
        <div className="flex flex-col justify-center  w-full lg:w-3/4 lg:flex-row bg-white rounded-lg px-8 py-12 gap-10 z-20">
          <div className="flex justify-center items-start flex-col gap-4 width-full">
            <h1 className="text-green-600 font-bold text-[35px]">
              Contact Info.
            </h1>
            <div
              id="phone"
              className="flex justify-center items-center gap-4 text-lg font-semibold text-gray-600"
            >
              <span className="bg-green-400 p-3 rounded-full">
                <a href="https://api.whatsapp.com/send?phone=923362589689" target="_blank">
                  <img src={call} alt="call-icon" width={22} height={22} />
                </a>
              </span>
              <a href="https://api.whatsapp.com/send?phone=923362589689" target="_blank">
                +92 336 2589689
              </a>
            </div>
            <div
              id="sms"
              className="flex justify-center items-center gap-4 text-lg font-semibold text-gray-600"
            >
              <span className="bg-green-400 p-3 rounded-full">
                <a href="mailto:+923362589689" target="_blank">
                  <img src={sms} alt="sms-icon" width={22} height={22} />
                </a>
              </span>
              <a href="mailto:+923362589689" target="_blank">
                nawalrai.chetan@mail.com
              </a>
            </div>
            <div
              id="address"
              className="flex justify-center items-center gap-4 text-lg font-semibold text-gray-600"
            >
              <span className="bg-green-400 p-3 rounded-full">
                <img src={map} alt="mail-icon" width={22} height={22} />
              </span>House#D-57 Officers Society Main Road Hyderabad.
            </div>
            <div id="logos" className="flex justify-center items-center gap-4 mt-10">
              <span className="bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-600">
                <a href="https://www.facebook.com/nawalrai.chetan" target="_blank" rel="noopener noreferrer">
                  <img src={fb} alt="fb-icon" width={25} height={25} />
                </a>
              </span>
              <span className="bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-600">
                <a href="https://www.instagram.com/nawalrai.chetan" target="_blank" rel="noopener noreferrer">
                  <img src={insta} alt="fb-icon" width={25} height={25} />
                </a>
              </span>
              <span className="bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-600">
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <img src={yt} alt="fb-icon" width={25} height={25} />
                </a>
              </span>
              <span className="bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-600">
                <a href="https://x.com/coding_pundit" target="_blank" rel="noopener noreferrer">
                  <img src={twitter} alt="fb-icon" width={25} height={25} />
                </a>
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-2  w-full">
              <input type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange} placeholder="Enter your name" className="px-4 py-4 w-full border-2 border-green-500 rounded-lg text-[18px] bg-slate-100 focus:outline-none focus-green-600" />
              <input type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange} placeholder="Enter your email" className="px-4 py-4 w-full border-2 border-green-500 rounded-lg text-[18px] bg-slate-100 focus:outline-none focus-green-600" />
              <textarea type="text"
                id="textarea"
                name="textarea"
                value={formData.textarea}
                onChange={handleChange} cols={25} rows={5} placeholder="Enter your message" className="px-4 py-4 w-full border-2 border-green-500 rounded-lg text-[18px] bg-slate-100 focus:outline-none focus-green-600"></textarea>
              <button className="bg-green-700 text-white px-4 py-3 w-full rounded-lg uppercase hover:bg-black hover:text-white cursor-pointer">submit</button>
            </div>
          </form>
        </div>
      </section>
      <img src={cube} alt="" className="w-full h-72 absolute top-[4100px] hidden xl:block" />
    </>
  );
};

export default Contact;
