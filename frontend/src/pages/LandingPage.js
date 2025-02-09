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
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left px-4">
        <h2 className="text-2xl md:text-5xl font-extrabold leading-tight">
          Join the <span className="text-blue-400">Ultimate Developers Hub</span>
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
        <div className="mt-6 bg-[#171732] rounded-lg p-1 text-purple-200 shadow-lg overflow-auto w-full bg-opacity-25 hidden md:inline-block" >
          <SyntaxHighlighter
            language="javascript"
            style={dracula}
            className="!bg-transparent text-sm md:text-base rounded-lg"
          >
            {`console.log("You're now part of the revolution! 🚀");`}
          </SyntaxHighlighter>
        </div>
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
