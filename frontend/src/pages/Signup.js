import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages
    try {
      if (!formData.name || !formData.email || !formData.skills || !formData.password || !formData.passwordConfirm) {
        setError('Please fill all fields');
        return;
      }
      if (formData.password !== formData.passwordConfirm) {
        setError('Passwords do not match');
        return;
      }

      const { passwordConfirm, ...dataToSend } = formData;
      console.log(dataToSend);
      const response = await axios.post('http://localhost:3005/api/users/register', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data) {
        localStorage.setItem('token', response.data);
        navigate('/dashboard');
        
        // Redirect or show success message
        
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-50'>
      <form onSubmit={onSubmitHandler} autoComplete="off" className='flex flex-col bg-white p-10 rounded-md shadow-md space-y-3 max-w-md sm:w-3/5 lg:w-2/6'>
        <h1 className='font-bold text-center'>Sign Up</h1>
        {error && <div className='text-red-500'>{error}</div>}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChangeHandler}
          placeholder="Name"
          className='p-2 rounded border'
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email"
          className='p-2 rounded border'
          autoComplete='off'
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={onChangeHandler}
          placeholder="Skills (comma separated)"
          className='p-2 rounded border'
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          placeholder="Password"
          autoComplete='new-password'
          className='p-2 rounded border'
        />
        <input
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={onChangeHandler}
          placeholder="Confirm Password"
          className='p-2 rounded border'
        />
        <button type="submit" className='bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-2 rounded'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
