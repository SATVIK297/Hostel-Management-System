import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Maintenance_requests = () => {
 

const currentAdmin = useSelector((state) => state.admin.currentAdmin);
  console.log(currentAdmin);

  const handleStatusChange = (id) => {


    const [error, setError] = useState('');
  
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id ? { ...request, status: 'done' } : request
      )
    );
  };
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch room cleaning requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/admin/maintenance/requests/${currentAdmin._id}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch room cleaning requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="container min-h-screen bg-blue-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Room Cleaning Requests</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-2xl">
        <thead className="bg-blue-500 rounded-3xl">
          <tr>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Block</th>
            <th className="py-2 px-4 border-b">Room No</th>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Registration No</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Time</th>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Maintenance Type</th>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="lg:rounded-lg">
              <td className="py-2 px-4 text-center items-center border-b hidden lg:table-cell">{request.block}</td>
              <td className="py-2 px-4 text-center border-b">{request.room}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.rollnum}</td>
              <td className="py-2 px-4 text-center border-b">{request.date}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.time}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.maintenanceType}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.description}</td>
              <td className="py-2 px-4 text-center border-b">{request.status}</td>
              <td className="py-2 px-4 text-center border-b">
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(request._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Mark as Done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance_requests;
