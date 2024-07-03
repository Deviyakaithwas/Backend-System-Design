// src/components/RequestForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const RequestForm = () => {
  const [request, setRequest] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await axios.post('/api/request', { user, request });
    const response = await axios.get(`/api/requests/${user.id}`);
    dispatch({ type: 'SET_REQUESTS', payload: response.data.requests });
  };

  return (
    <div>
      <input value={request} onChange={(e) => setRequest(e.target.value)} />
      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
};

export default RequestForm;
