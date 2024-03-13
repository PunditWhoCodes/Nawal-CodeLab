import React from "react";
import heroImg from "../assets/images/heroImg.png";
const Hero = () => {
  return (
    <section id="home" className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full bg-slate-100 h-auto lg:h-screen">
      <div className="flex justify-center items-start flex-col gap-8 lg:w-1/2 px-10 py-10 lg:px-20 lg:py-20">
        <h1 className="text-green-600 font-bold text-6xl">
          Empower your future with knowledge.
        </h1>
        <p className="text-slate-950 text-2xl ">
        Welcome to our online tech course platform, where you'll explore a comprehensive array of cutting-edge technologies.
        </p>
        <div className="flex justify-center items-center gap-7">
          <button className="bg-green-800 hover:bg-black-700 text-white  px-4 lg:px-8 py-3 hover:bg-black hover:text-white rounded-md text-[18px] cursor-pointer">
          View More Courses
          </button>
          <button className="border-2 border-green-800 text-green-800 text-[18px] rounded-md px-4 lg:px-8 py-3 hover:border-black cursor-pointer ">
            Watch Video
          </button>
        </div>
      </div>
        <div className="flex justify-center items-center w-1/2 px-5 py-20 object-cover">
          <img src={heroImg} alt="Image" width={500} height={500}/>
        </div>
    </section>
  );
};

export default Hero;
