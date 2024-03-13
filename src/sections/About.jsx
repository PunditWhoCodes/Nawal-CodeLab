import React from "react";
import { aboutgrids } from "../exports";
import AboutGrid from "../components/AboutGrid";

const About = () => {
  return (
    <section
      id="courses"
      className="w-full bg-slate-200 flex flex-col lg:flex-row gap-10 lg:gap-20 h-fitpx-7 py-4 lg:px-16 lg:py-12"
    >
      <div className="flex justify-center items-start flex-col gap-8 lg:w-1/2">
        <h1 className="text-green-600 font-bold text-6xl">
          Learn Latest Techincal Skills
        </h1>
        <p className="text-slate-950 text-2xl">
        Elevate your skill set with our latest technology courses, empowering you to thrive in the competitive global landscape.
        </p>
        <div className="flex justify-center items-center gap-7 ">
          <button className="bg-green-800 text-white px-8 py-3 rounded-md text-[18px] hover:bg-black hover:text-white cursor-pointer">
            Read More
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center w-full lg:w-1/2 flex-wrap">
        {
          aboutgrids.map((grid, id)=>(
            <div key={id} className="w-full lg:w-1/2">
              <AboutGrid {...grid}/>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default About;
