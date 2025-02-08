import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaArrowRight,FaMailchimp} from 'react-icons/fa';
import {MdVerified,MdEmail} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setSearch('');
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://lancer-app-praveen.onrender.com/api/users/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const onSearch = () => {
    if (search === '') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(user => user.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))));
    }
  };

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-[#251841] to-black text-white mt-15 pt-12'>
      <div className='flex items-center justify-center w-full md:w-2/4 m-3'>
        <input
          type='text'
          placeholder='Search'
          className='border-2 border-purple-300 p-2 rounded-lg w-3/4 md:w-2/4'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className='bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 m-2 p-2 rounded-lg' onClick={onSearch}>
          Search
        </button>
      </div>

      <div className='w-full flex flex-col items-center justify-center'>
      {loading ? (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='loader text-lg text-blue-600'>Loading... Just a Sec!</div>
        </div>
      ) : (
        filteredData.length > 0 ? (
          filteredData.map((user) => (
            <div
            onClick={() => navigate(`/user/${user._id}`) }
              key={user._id}
              className='bg-gradient-to-r from-indigo-900 to-[#230e4d] text-white w-5/6 md:w-3/4 h-auto m-3 p-5 rounded-lg flex flex-col md:flex-row items-center cursor-pointer hover:shadow-lg hover:shadow-purple-900 transition duration-200 ease-in-out '
            >
              <FaUser className='text-6xl sm:text-9xl text-slate-500 bg-slate-100 p-3 rounded-full ml-5 m-5' />
              <div className='mx-2 font-bold text-white w-full md:w-2/6 p-2 rounded-lg'>
              <div className='flex items-center space-x-1'>
              <h1 className='text-center md:text-left'>{user.name} </h1>
              <MdVerified/>
              </div>
                <div className='flex items-center space-x-1'>
                  <MdEmail/>
                  <h2 className='font-normal  text-xs md:text-base'>{user.email}</h2>

                </div>
                
              </div>

             <div className='m-5 w-full md:w-2/5 cursor-pointer justify-center md:justify-start text-white-700 p-2 rounded-lg'>
             <p className='text-sm'>Skills:</p>
             <ul className='flex flex-wrap  '>
                {user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className='font-semibold  px-2 py-1 rounded-lg m-1 text-sm md:text-base bg-indigo-900 text-white'
                  >
                    {skill}
                  </li>
                ))}
              </ul>
             </div>

              <div
                className='flex items-center  mt-2 md:mt-0 bg-purple-900 text-white p-1 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-900 hover:to-blue-800'
                onClick={() => navigate(`/user/${user._id}`) }
              >
                <p className='mr-2'>Connect</p>
                <FaArrowRight className='text-sm m-1' />
              </div>
            </div>
          ))
        ) : (
          <p className='mt-10 text-purple-700 font-bold'>Oops! No Developers Found</p>
        )
      )}
      </div>
    </div>
  );
};

export default Dashboard;
