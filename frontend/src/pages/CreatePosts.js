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
    <div className="max-w-lg mx-auto p-6 bg-white  rounded-lg m-5 h-auto mt-16">
     <ReactQuill value={content} onChange={setContent} className='h-60 m-2' />
  
  <button className="mt-20 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200" onClick={onPost}>
    Post
  </button>
</div>
  )
}

export default CreatePosts
