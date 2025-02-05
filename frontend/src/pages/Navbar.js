import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const token=localStorage.getItem('token');
  const onCLickLogout=()=>{
    localStorage.removeItem('token');  
    navigate('/login')
  }
  return (
    <nav className=" p-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-xl font-bold">Developers Hub</a>

        {/* Desktop Menu */}
        {!token ? <ul className="hidden md:flex space-x-6 text-white">
          <li><a href="/signup" className="hover:text-gray-200">Sign Up</a></li>
          <li><a href="/login" className="hover:text-gray-200">Login</a></li>
         
        </ul> : <ul className="hidden md:flex space-x-6 text-white">
         
          <li onClick={()=>navigate('/posts')} className="hover:text-gray-200  cursor-pointer" >Home</li>
          <li onClick={()=>navigate('/createpost')} className="hover:text-gray-200 cursor-pointer" >Create Post</li>
          <li onClick={()=>navigate('/likedposts')} className="hover:text-gray-200 cursor-pointer" >Liked Posts</li>
          <li onClick={()=>navigate('/dashboard')} className="hover:text-gray-200 cursor-pointer" >Developers</li>
          <li My onClick={()=>navigate('/myposts')} className="hover:text-gray-200 cursor-pointer"> My Posts</li>
          <li className="hover:text-red-600" onClick={onCLickLogout}>Logout</li>
          
        </ul>}
       

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
  <ul className="md:hidden text-white text-center p-4 space-y-2">
    {!token ? (
      <>
        <li><a href="#" className="hover:text-gray-200">Sign Up</a></li>
        <li><a href="#" className="hover:text-gray-200">Login</a></li>
      </>
    ) : (
      <>
       <li><a href="#" className="hover:text-gray-200" >Home</a></li>
          <li><a href="#" className="hover:text-gray-200" >Create Post</a></li>
          <li><a href="#" className="hover:text-gray-200" >Liked Posts</a></li>
          <li><a href="#" className="hover:text-gray-200" >Developers</a></li>
          <li><a href="#" className="hover:text-gray-200" ></a>My Posts</li>
          <li><a href="#" className="hover:text-red-600" onClick={onCLickLogout}>Logout</a></li>
         
      </>
      
    )}
  </ul>
)}

    </nav>
  );
};

export default Navbar;
