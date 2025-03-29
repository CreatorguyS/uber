import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log('Submitting login with:', { email, password });

    const newUser = { email, password };

    try {
      console.log('Posting to:', `${import.meta.env.VITE_BASE_URL}/users/login`);

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser, {
        headers: { "Content-Type": "application/json" }, // Ensure JSON is sent
      });

      console.log('Response status:', response.status);

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token)
        console.log('User logged in:', data.user);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img className="w-16 mb-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Logo" />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f3f3f3] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#f3f3f3] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
          <p className="text-center">
            New here? <Link to="/signup" className="text-blue-600">Create new Account</Link>
          </p>
        </form>
      </div>
      <div>
        <Link to="/captain-login" className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
