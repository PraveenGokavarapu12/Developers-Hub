import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../images/dev img.jpg";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typewriter } from "react-simple-typewriter";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center px-6 py-12 w-full bg-gradient-to-r from-[#251841] to-black text-white min-h-screen overflow-hidden font-mono">
           {/* Floating Purple Ball (Directly on Cursor) */}
           <div className="absolute top-1/3 left-5 w-40 h-40 bg-purple-500 rounded-full opacity-50 blur-3xl animate-floatingBall"></div>
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left px-4">
        <h2 className="text-2xl md:text-5xl font-extrabold leading-tight">
          Join the Ultimate <span className="text-blue-400">Developers Hub</span>
        </h2>

        {/* Typing Effect */}
        <h1 className="text-lg md:text-3xl font-bold text-white mt-4 min-h-[50px]">
          <Typewriter
            words={[
              "Code, Collaborate, Conquer!",
              "Build. Innovate. Inspire.",
              "Welcome to Developers Hub!",
            ]}
            loop={Infinity}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>

        {/* Get Started Button */}
        <button
          className="mt-6 text-white px-2 py-2 rounded-lg font-semibold transition bg-indigo-800 bg-opacity-80 hover:bg-indigo-700 text-base "
          onClick={() => navigate("/login")}
        >
          Get Started &gt;&gt;
        </button>

        {/* Code Block (Now Responsive) */}
       <aside className="bg-[#1b1131] text-white p-6 rounded-lg w-full max-w-lg font-mono mt-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm">bash</p>
      </div>
      <div className="mt-4">
        <p className="text-yellow-200 text-sm"><span className="text-blue-400">console.log </span>("You're now part of the revolution! 🚀");</p>
       
      </div>
    </aside>
      </div>

      {/* Right Image (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 justify-center animate-slideRight">
        <img
          src={img}
          alt="Developers Hub"
          className="w-full rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default LandingPage;
