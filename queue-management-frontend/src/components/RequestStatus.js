// src/components/RequestStatus.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const RequestStatus = () => {
  const user = useSelector((state) => state.user);
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get(`/api/requests/${user.id}`);
      dispatch({ type: 'SET_REQUESTS', payload: response.data.requests });
    };

    fetchRequests();
  }, [user, dispatch]);

  return (
    <div>
      {requests.map((request, index) => (
        <div key={index}>{request.status}</div>
      ))}
    </div>
  );
};

export default RequestStatus;
