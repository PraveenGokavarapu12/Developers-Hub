
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

import moment from 'moment'


const UserDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // Initialize with null to handle loading state

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://lancer-app-praveen.onrender.com/api/users/developer/${id}`, {
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

  }, [id]);

  if (!data) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className='flex flex-col items-center justify-start min-h-screen  px-4 bg-gradient-to-r from-[#251841] to-black text-white mt-15 pt-12'>
      <div className=' w-full sm:w-3/4 h-auto m-3 p-5 sm:p-10 rounded-lg flex flex-col sm:flex-row items-center'>
        <FaUser className='text-6xl sm:text-9xl text-slate-500 bg-slate-100 p-3 rounded-full mb-4 sm:mb-0 sm:ml-5 sm:m-5' />
        <div className='mx-2 font-bold w-full sm:w-2/6 text-center sm:text-left'>
          <h1>{data.user.name}</h1>
          <h2 className='font-normal'>Email: {data.user.email}</h2>
          <ul className='list-disc list-inside'>
            <p className='text-sm m-1'>Skills :</p>
            {data.user.skills && data.user.skills.map((skill, index) => (
              <li key={index} className='font-normal'>{skill}</li>
            ))}
          </ul>
        </div>
        <div
          className='flex items-center  mt-2 md:mt-0 bg-purple-900 text-white p-1 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600'

        >
          <p className='mr-2'>Message</p>

        </div>
      </div>
      {data.posts.length !== 0 ?
        <div className='flex flex-col w-3/4 justify-start'>
          <h1 className='font-extrabold text-blue-500'>Posts</h1>
          {data.posts.map((post) => (
            <div key={post._id} className=' m-2 p-2 rounded-lg'>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <p className="text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</p>
              <hr className="border-t-2 border-blue-500 my-6 w-3/4 " />

            </div>



          ))}
        </div> : <p>No Posts Yet!</p>}
    </div>
  );
};

export default UserDetails;
