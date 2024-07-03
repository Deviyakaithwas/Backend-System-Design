// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response = await axios.post('/api/login', { username });
    dispatch({ type: 'SET_USER', payload: response.data.user });
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
