import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Maintenance_status = () => {
  const currentuser = useSelector((state)=>state.user.currentUser)
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      const userId = currentuser._id; // Fetch the user ID from local storage

      if (!userId) {
        setError('User ID is not available. Please log in.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/service/maintenancestatus/${userId}`, {
          withCredentials: true, // Ensure the token is sent with the request
        });
        console.log(response);
        
        setRequests(response.data); // Assuming the response contains an array of requests
      } catch (err) {
        setError('Failed to fetch room cleaning requests. Please try again.');
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Room Cleaning Requests</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Block</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Time</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2 whitespace-nowrap">{request.room}</td>
                <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">{request.block}</td>
                <td className="px-4 py-2 whitespace-nowrap ">{new Date(request.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">{request.time}</td>
                <td className="px-4 py-2 whitespace-nowrap">{request.maintenanceType}</td>
                <td className={`px-4 py-2 whitespace-nowrap font-semibold ${
                    request.status === 'Pending' ? 'text-red-500' : 'text-green-500'
                  }`}>
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maintenance_status;
