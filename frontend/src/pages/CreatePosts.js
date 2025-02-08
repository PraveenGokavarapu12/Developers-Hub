import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePosts = () => {
  const navigate=useNavigate()
  const [content,setContent]=useState('')
  const onPost=async()=>{
    if(content===''){
      alert("Text is empty")
      
    }
    else{
      const fetch = async () => {
        try {
          const res = await axios.post(`https://lancer-app-praveen.onrender.com/api/posts`,{content}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
         
          console.log(res.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
       
      };
      fetch();
      navigate('/')


    }
    
  }
  return (
   <div className='flex justify-center items-center bg-gradient-to-r from-[#251841] to-black text-white mt-15 min-h-screen'>
     <div className="max-w-lg mx-auto p-6  rounded-lg m-5 h-auto mt-16 md:w-2/3">
     <ReactQuill value={content} onChange={setContent} className='h-80  m-2 text-white' />
  
  <button className="mt-20 w-full bg-indigo-700 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200" onClick={onPost}>
    Post
  </button>
</div>
   </div>
  )
}

export default CreatePosts
