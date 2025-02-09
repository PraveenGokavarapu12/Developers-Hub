import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../images/dev img.jpg";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typewriter } from 'react-simple-typewriter';

const LandingPage = () => {
  
  const navigate=useNavigate()
  return (
    <div
      className="relative flex justify-center items-center pt-12 p-5 w-full bg-gradient-to-r from-[#251841] to-black text-white min-h-screen overflow-hidden font-mono"
   
    >
      {/* Floating Purple Ball (Directly on Cursor) */}
      <div className="absolute top-1/3 left-5 w-40 h-40 bg-purple-500 rounded-full opacity-50 blur-3xl animate-floatingBall"></div>
      

      {/* Left Content */}
      <div className="text-center md:text-left md:w-1/2 p-5 animate-slideLeft">
        <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
          Join the Ultimate<span className="text-blue-400"> Developers Hub</span>
        </h2>
        <h1 className="text-3xl font-bold text-white my-3">
      <Typewriter
        words={['Code, Collaborate, Conquer!', 'Build. Innovate. Inspire.', 'Welcome to Developers Hub!']}
        loop={Infinity} // Keep typing indefinitely
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h1>
        <button
          className="mt-6   text-white px-2 py-2 rounded-lg font-semibold transition   bg-indigo-800 bg-opacity-75 cursor-pointer text-sm "
          onClick={() => navigate("/login")}
        >
          Get Started &gt;&gt;
        </button>
        
        <div className="bg-gradient-to-r from-[#261c3b] to-[#150634] rounded-lg text-purple-200 bg-opacity-50">
       
        <SyntaxHighlighter language="javascript" style={dracula} className="!bg-transparent text-normal rounded-lg">
       {`console.log("You're now part of the revolution! 🚀");`}
      </SyntaxHighlighter>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 hidden md:block animate-slideRight">
        <img src={img} alt="Developers Hub" className="rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default LandingPage;
