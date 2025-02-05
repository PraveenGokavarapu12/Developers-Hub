import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg m-5">
  <textarea
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
    rows="7"
    placeholder="Write something here..."
    onChange={(e)=>{setContent(e.target.value)}}
  ></textarea>
  <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200" onClick={onPost}>
    Post
  </button>
</div>
  )
}

export default CreatePosts
