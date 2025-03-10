import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = React.useState({
    
    email: '',
  
    password: '',
   
  });
  const navigate=useNavigate();
  const [error, setError] = React.useState('');
  const onChangeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        setError(' ');
        if(!formData.email || !formData.password){
            setError('Please fill all fields');
            return;
        }
        try{
            const response=await axios.post('https://lancer-app-praveen.onrender.com/api/users/login',formData)
            if(response.data){
                
                localStorage.setItem('token',response.data)
                navigate('/')
                
            }

        }
        catch(err){
            setError(err.response ? err.response.data.message : err.message);
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#251841] to-black text-white"'>
        {error && <div className='text-red-500'>{error}</div>}
      <form  autoComplete="off" onSubmit={onSubmitHandler} className='flex flex-col bg-indigo-900 p-10 rounded-md shadow-md space-y-2 max-w-md sm:w-3/5 lg:w-2/6'>
        <h1 className='font-bold text-center text-white'>Login</h1>
       
      
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
          type="password"
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          placeholder="Password"
          autoComplete='new-password'
          className='p-2 rounded border'
        />
        
        <button type="submit" className='bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-600 hover:to-blue-600 p-2 rounded text-white'>Login</button>
      </form>
      <p className='text-white'>Don't have an account?  <span onClick={()=>navigate('/signup')} className='text-blue-600 cursor-pointer'>Signup</span></p>
    </div>
  );
};

export default Signup;
