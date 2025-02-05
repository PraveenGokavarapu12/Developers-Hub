import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const MyPosts = (id) => {
  const navigate=useNavigate();
  const [data, setData] = useState([]); // Initialize with null to handle loading state
  const deletePost=async(id)=>{
    try{
      const res=await axios.delete(`http://localhost:3005/api/posts/${id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(res.data);
      setData(data.filter(post=>post._id!=id));
    }
    catch(err){
      console.error(err);

    }

  }


  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:3005/api/posts/myposts`, {
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
                      <p>{post.content}</p>
                      <p className="text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</p>
                      <FaTrash className='cursor-pointer text-blue-600 m-1' onClick={()=>{deletePost(post._id)}}/>
                      <hr className="border-t-2 border-blue-500 my-6 w-3/4 " />
        
                    </div>
        
        
        
                  ))}
                  <button className='bg-blue-600 text-white p-2 m-1 rounded-lg' onClick={()=>navigate('/createpost')}>New Post +</button>
      </div>):<p>No posts Yet</p>}

      
    </div>
  )
}

export default MyPosts
