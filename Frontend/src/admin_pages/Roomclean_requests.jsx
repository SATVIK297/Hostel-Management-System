import React, { useState ,useEffect} from 'react';
import axios from 'axios';


const Roomcleaning_requests = () => {
  // Dummy data for room cleaning requests
//   const [requests, setRequests] = useState([
//     {
//       _id: '1',
//       block: 'A',
//       roomNo: '101',
//       rollNo: '21BCE0001',
//       date: '2024-08-10',
//       time: '10:00 AM',
//       status: 'pending',
//       description: 'Clean the floor and change bed sheets.',
//     },
//     {
//       _id: '2',
//       block: 'B',
//       roomNo: '202',
//       rollNo: '21BCE0002',
//       date: '2024-08-11',
//       time: '11:30 AM',
//       status: 'done',
//       description: 'Dust the room and clean the windows.',
//     },
//     {
//       _id: '3',
//       block: 'C',
//       roomNo: '303',
//       rollNo: '21BCE0003',
//       date: '2024-08-12',
//       time: '01:00 PM',
//       status: 'pending',
//       description: 'Clean the bathroom and replace towels.',
//     },
//     {
//       _id: '4',
//       block: 'D',
//       roomNo: '404',
//       rollNo: '21BCE0004',
//       date: '2024-08-13',
//       time: '03:30 PM',
//       status: 'pending',
//       description: 'Mop the floor and clean the furniture.',
//     },
//   ]);

  const handleStatusChange = (id) => {
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
        const response = await axios.get('http://localhost:5000/api/v1/admin/roomclean/requests');
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
            <th className="py-2 px-4 border-b hidden lg:table-cell">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="lg:rounded-lg">
              <td className="py-2 px-4 items-center border-b hidden lg:table-cell">{request.block}</td>
              <td className="py-2 px-4 border-b">{request.roomNo}</td>
              <td className="py-2 px-4 border-b hidden lg:table-cell">{request.rollNo}</td>
              <td className="py-2 px-4 border-b">{request.date}</td>
              <td className="py-2 px-4 border-b hidden lg:table-cell">{request.time}</td>
              <td className="py-2 px-4 border-b hidden lg:table-cell">{request.description}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
              <td className="py-2 px-4 border-b">
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

export default Roomcleaning_requests;
