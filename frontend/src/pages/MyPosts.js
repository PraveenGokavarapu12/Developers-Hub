import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const MyPosts = (id) => {
  const navigate=useNavigate();
  const [data, setData] = useState([]);
   // Initialize with null to handle loading state
   const [loading,setLoading]=useState(false);
  const deletePost=async(id)=>{
    setData(data.filter(post=>post._id!=id));
    try{
     
      const res=await axios.delete(`https://lancer-app-praveen.onrender.com/api/posts/${id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(res.data);
    
     
    }
    catch(err){
      console.error(err);

    }
    finally {
      setLoading(false);
    }

  }


  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://lancer-app-praveen.onrender.com/api/posts/myposts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setData(res.data);
        console.log(res.data)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };
    fetch();
  },[]);
  return (
   
  
    <div className='flex flex-col justify-start items-center p-4 min-w-full mt-16'>
      {loading ? (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='loader text-lg text-blue-500'>Loading... Just a Sec!</div>
        </div>
      ) :
     (data.length!==0 ?  
      (<div  className='m-2 p-2 rounded-lg w-3/4'>
        {data.map((post) => (
                    <div key={post._id}>
                       <div dangerouslySetInnerHTML={{ __html: post.content }} />
                      <p className="text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</p>
                      <FaTrash className='cursor-pointer text-blue-600 m-1' onClick={()=>{deletePost(post._id)}}/>
                      <hr className="border-t-2 border-blue-500 my-6 w-3/4 " />
        
                    </div>
        
        
        
                  ))}
                  <button className='bg-blue-600 text-white p-2 m-1 rounded-lg' onClick={()=>navigate('/createpost')}>New Post +</button>
      </div>):<p>No posts Yet</p>)}

      
    </div>
  )
}

export default MyPosts
