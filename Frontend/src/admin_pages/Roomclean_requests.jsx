// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RoomCleaningRequests = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     // Fetch room cleaning requests from the backend
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/v1/admin/roomclean/requests');
//         console.log('API Response:', response.data); // Log response for debugging
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Failed to fetch room cleaning requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleStatusChange = (id) => {
//     setRequests((prevRequests) =>
//       prevRequests.map((request) =>
//         request._id === id ? { ...request, status: 'done' } : request
//       )
//     );
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
//               <td className="py-2 px-4 border-b">{request.date}</td>
//               <td className="py-2 px-4 border-b hidden lg:table-cell">{request.time}</td>
//               <td className="py-2 px-4 border-b hidden lg:table-cell">{request.description}</td>
//               <td className="py-2 px-4 border-b">{request.status}</td>
//               <td className="py-2 px-4 border-b">
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

// export default RoomCleaningRequests;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomCleaningRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/admin/roomclean/requests'); // Replace with your actual API endpoint
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching room cleaning requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Room Cleaning Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Roll Number</th>
            <th>Description</th>
            <th>Room</th>
            <th>Block</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.rollnum}</td>
              <td>{request.description}</td>
              <td>{request.room}</td>
              <td>{request.block}</td>
              <td>{new Date(request.date).toLocaleDateString()}</td>
              <td>{request.time}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomCleaningRequests;
