

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Roomcleaning_requests = () => {
//   const currentAdmin = useSelector((state) => state.admin.currentAdmin);
//   const [requests, setRequests] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/v1/admin/roomclean/requests/${currentAdmin._id}`);
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Failed to fetch room cleaning requests:', error);
//       }
//     };

//     fetchRequests();
//   }, [currentAdmin._id]);

//   const handleStatusChange = async (id) => {
//     try {
//       // Send a PUT request to update the status of the specific request
//       await axios.put(`http://localhost:5000/api/v1/admin/roomclean/requests/${id}/status`, {
//         status: 'completed',
//       });

//       // Update the UI to reflect the status change
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request._id === id ? { ...request, status: 'completed' } : request
//         )
//       );
//     } catch (error) {
//       console.error('Failed to update request status:', error);
//       setError('Failed to update request status');
//     }
//   };

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
//             <th className="py-2 px-4 border-b hidden lg:table-cell">Description</th>
//             <th className="py-2 px-4 border-b">Status</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((request) => (
//             <tr key={request._id} className="lg:rounded-lg">
//               <td className="py-2 px-4 items-center border-b hidden lg:table-cell">{request.block}</td>
//               <td className="py-2 px-4 border-b">{request.room}</td>
//               <td className="py-2 px-4 border-b hidden lg:table-cell">{request.rollnum}</td>
//               <td className="py-2 px-4 border-b">{new Date(request.date).toLocaleDateString()}</td>
//               <td className="py-2 px-4 border-b hidden lg:table-cell">{request.time}</td>
//               <td className="py-2 px-4 border-b hidden lg:table-cell">{request.description}</td>
//               <td className="py-2 px-4 border-b">{request.status}</td>
//               <td className="py-2 px-4 border-b">
//                 {request.status === 'pending' && (
//                   <button
//                     onClick={() => handleStatusChange(request._id)}  // Passing the _id to the function
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
//       {error && <div className="text-red-500 mt-2">{error}</div>}
//     </div>
//   );
// };

// export default Roomcleaning_requests;


import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Roomcleaning_requests = () => {
  const currentAdmin = useSelector((state) => state.admin.currentAdmin);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State to manage success message

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/admin/roomclean/requests/${currentAdmin._id}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch room cleaning requests:', error);
        setError('Failed to fetch room cleaning requests');
      }
    };

    fetchRequests();
  }, [currentAdmin._id]);

  const handleStatusChange = async (id) => {
    try {
      // Send a PUT request to update the status of the specific request
      await axios.put(`http://localhost:5000/api/v1/admin/roomclean/requests/${id}/status`, {
        status: 'completed',
      });

      // Update the UI to reflect the status change
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: 'completed' } : request
        )
      );

      // Show success message
      setSuccess(true);
      
      // Remove success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error('Failed to update request status:', error);
      setError('Failed to update request status');
    }
  };

  return (
    <div className="container min-h-screen bg-blue-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Room Cleaning Requests</h1>

      {success && (
        <div className="bg-green-500 text-white p-2 mb-4 rounded">
          ✅ Marked as Done Successfully!
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300 rounded-2xl">
        <thead className="bg-blue-500 rounded-3xl">
          <tr>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Block</th>
            <th className="py-2 px-4 border-b">Room No</th>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Registration No</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Time</th>
            <th className="py-2 px-4 border-b hidden lg:table-cell">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="lg:rounded-lg">
              <td className="py-2 px-4 items-center border-b hidden lg:table-cell">{request.block}</td>
              <td className="py-2 px-4 border-b">{request.room}</td>
              <td className="py-2 px-4 border-b hidden lg:table-cell">{request.rollnum}</td>
              <td className="py-2 px-4 border-b">{new Date(request.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b hidden lg:table-cell">{request.time}</td>
              <td className="py-2 px-4 border-b hidden lg:table-cell">{request.description}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
              <td className="py-2 px-4 border-b">
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

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Roomcleaning_requests;
