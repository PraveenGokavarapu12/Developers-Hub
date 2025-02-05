import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaTrash,FaUser,FaRegThumbsUp ,FaRegThumbsDown,FaThumbsUp,FaThumbsDown} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
const MyPosts = () => {
  const [data, setData] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    
  };
  const [dislikedPosts, setdisLikedPosts] = useState({});

  const toggledisLike = (postId) => {
    setdisLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:3005/api/posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setData(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  },[]);
  return (
   
  
    <div className='flex flex-col justify-start items-center p-4 min-w-full'>
     {data.length!==0 ?  
      (<div  className='m-2 p-2 rounded-lg w-3/4'>
        {data.map((post) => (
                    <div key={post._id}>
                        <div className='flex items-center '>
                        <FaUser className='text-3xl sm:text-5xl text-slate-500 bg-slate-100 p-3 rounded-full ml-5 m-5' />
                         <div className='mx-2 font-bold text-blue-900 w-full md:w-2/6 p-2 rounded-lg'>
                                      <div className='flex items-center space-x-1'>
                                      <h1 className='text-center md:text-left'>{post.user_id.name} </h1>
                                      <MdVerified/>
                                      </div>
                                        <div className='flex items-center space-x-1'>
                                         
                                          <h2 className='font-normal'>{post.user_id.email}</h2>
                        
                                        </div>
                                        
                                      </div>

                        </div>
                         
                      <p>{post.content}</p>
                      <p className="text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</p>
                    <div className='flex space-x-3'>
                    <button onClick={() => toggleLike(post._id)}>
            {likedPosts[post._id] ? (
              <FaThumbsUp className="m-2 text-blue-500 cursor-pointer" />
            ) : (
              <FaRegThumbsUp className="m-2 text-blue-500 cursor-pointer" />
            )}
          </button>
                   
          <button onClick={() => toggledisLike(post._id)}>
            {dislikedPosts[post._id] ? (
              <FaThumbsDown className="m-2 text-blue-500 cursor-pointer" />
            ) : (
              <FaRegThumbsDown className="m-2 text-blue-500 cursor-pointer" />
            )}
          </button>
                   

                    </div>

                   
                      <hr className="border-t-2 border-blue-500 my-6 w-full " />
        
                    </div>
        
        
        
                  ))}
                  
      </div>):<p>No posts Yet</p>}

      
    </div>
  )
}

export default MyPosts
