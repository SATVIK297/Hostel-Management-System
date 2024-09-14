// import React, { useState ,useEffect} from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';


// const Maintenance_requests = () => {
 
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false); // State to manage success message

// const currentAdmin = useSelector((state) => state.admin.currentAdmin);
//   console.log(currentAdmin);

//   const handleStatusChange = async (id) => {
//     try {
//       // Send a PUT request to update the status of the specific request
//       await axios.put(`http://localhost:5000/api/v1/admin/maintenance/requests/${id}/status`, {
//         status: 'completed',
//       });

//       // Update the UI to reflect the status change
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request._id === id ? { ...request, status: 'completed' } : request
//         )
//       );

//       // Show success message
//       setSuccess(true);
      
//       // Remove success message after 3 seconds
//       setTimeout(() => setSuccess(false), 3000);

//     } catch (error) {
//       console.error('Failed to update request status:', error);
//       setError('Failed to update request status');
//     }
//   };

  
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     // Fetch room cleaning requests from the backend
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/v1/admin/maintenance/requests/${currentAdmin._id}`);
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Failed to fetch room cleaning requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   return (
//     <div className="container min-h-screen bg-blue-200 p-4">
//       <h1 className="text-2xl font-bold mb-4">Room Cleaning Requests</h1>
//       <table className="min-w-full bg-white border border-gray-300 rounded-2xl">
//         <thead className="bg-blue-500 rounded-3xl">
//           <tr>
//             <th className="py-2 px-4 border-b hidden lg:table-cell">Block</th>
//             <th className="py-2 px-4 border-b">Room No</th>
//             <th className="py-2 px-4 border-b hidden lg:table-cell">Registration No</th>
//             <th className="py-2 px-4 border-b">Date</th>
//             <th className="py-2 px-4 border-b hidden lg:table-cell">Time</th>
//             <th className="py-2 px-4 border-b hidden lg:table-cell">Maintenance Type</th>
//             <th className="py-2 px-4 border-b hidden lg:table-cell">Description</th>
//             <th className="py-2 px-4 border-b">Status</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((request) => (
//             <tr key={request._id} className="lg:rounded-lg">
//               <td className="py-2 px-4 text-center items-center border-b hidden lg:table-cell">{request.block}</td>
//               <td className="py-2 px-4 text-center border-b">{request.room}</td>
//               <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.rollnum}</td>
//               <td className="py-2 px-4 text-center border-b">{request.date}</td>
//               <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.time}</td>
//               <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.maintenanceType}</td>
//               <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.description}</td>
//               <td className="py-2 px-4 text-center border-b">{request.status}</td>
//               <td className="py-2 px-4 text-center border-b">
//                 {request.status === 'pending' && (
//                   <button
//                     onClick={() => handleStatusChange(request._id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Mark as Done
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Maintenance_requests;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Maintenance_requests = () => {
  const currentAdmin = useSelector((state) => state.admin.currentAdmin);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // States for individual filters
  const [roomFilter, setRoomFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/admin/maintenance/requests/${currentAdmin._id}`);
        setRequests(response.data);
        setFilteredRequests(response.data); // Initialize filtered requests with all data
      } catch (error) {
        console.error('Failed to fetch maintenance requests:', error);
        setError('Failed to fetch maintenance requests');
      }
    };

    fetchRequests();
  }, [currentAdmin._id]);

  const handleStatusChange = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/admin/maintenance/requests/${id}/status`, {
        status: 'completed',
      });

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: 'completed' } : request
        )
      );

      setFilteredRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: 'completed' } : request
        )
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update request status:', error);
      setError('Failed to update request status');
    }
  };

  // Function to filter requests based on room number, date, and status
  const filterRequests = () => {
    const filtered = requests.filter((request) => {
      const matchesRoom = request.room.toLowerCase().includes(roomFilter.toLowerCase());
      const matchesDate = new Date(request.date).toLocaleDateString().includes(dateFilter);
      const matchesStatus = statusFilter === '' || request.status === statusFilter;

      return matchesRoom && matchesDate && matchesStatus;
    });

    setFilteredRequests(filtered);
  };

  // Handle changes in filter inputs
  useEffect(() => {
    filterRequests();
  }, [roomFilter, dateFilter, statusFilter]); // Filter requests whenever a filter changes

  return (
    <div className="container min-h-screen bg-blue-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Maintenance Requests</h1>

      {/* Success message */}
      {success && (
        <div className="bg-green-500 text-white p-2 mb-4 rounded">
          ✅ Marked as Done Successfully!
        </div>
      )}

      {/* Filter inputs */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label className="block mb-1">Room Number</label>
          <input
            type="text"
            placeholder="Filter by Room Number"
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="text"
            placeholder="Filter by Date (e.g., 08/11/2024)"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
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
          {filteredRequests.map((request) => (
            <tr key={request._id} className="lg:rounded-lg">
              <td className="py-2 px-4 text-center items-center border-b hidden lg:table-cell">{request.block}</td>
              <td className="py-2 px-4 text-center border-b">{request.room}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.rollnum}</td>
              <td className="py-2 px-4 text-center border-b">{new Date(request.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.time}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.maintenanceType}</td>
              <td className="py-2 px-4 text-center border-b hidden lg:table-cell">{request.description}</td>
              <td className="py-2 px-4 text-center border-b">{request.status}</td>
              <td className="py-2 px-4 text-center border-b">
              {request.status === 'pending' ? (
          <button
            onClick={() => handleStatusChange(request._id)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Mark as Done
          </button>
        ) : (
          <span>✅</span>
        )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Error message */}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Maintenance_requests;
