import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { captain, setCaptain } = React.useContext(CaptainDataContext) || {};

  useEffect(() => {
    console.log("Updated captain:", captain);
  }, [captain]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, { email, password });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setCaptain(data.captain);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }

    setEmail('');
    setPassword('');
    setLoading(false);
  };

  return (
    <div className='p-7 flex h-screen flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Captain" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#f3f3f3] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder="email@example.com"
          />

          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#f3f3f3] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder="password"
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          <p className='text-center'>
            Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
          </p>
        </form>
      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg'>
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
