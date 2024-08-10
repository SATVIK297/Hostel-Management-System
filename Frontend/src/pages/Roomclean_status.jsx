import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Roomclean_status = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [totalRequests, setTotalRequests] = useState(0);
  const [lastMonthRequests, setLastMonthRequests] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/admin/roomclean', {
          withCredentials: true, // Ensure the token is sent with the request
        });
        
        setRequests(response.data.requests);
        setTotalRequests(response.data.totalRequests);
        setLastMonthRequests(response.data.lastMonthRequests);
      } catch (err) {
        setError('Failed to fetch room cleaning requests. Please try again.');
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Room Cleaning Requests</h1>
      {error && <p className="text-red-500">{error}</p>}
      <p>Total Requests: {totalRequests}</p>
      <p>Requests from Last Month: {lastMonthRequests}</p>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap">{request.room}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.block}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(request.date).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roomclean_status;
