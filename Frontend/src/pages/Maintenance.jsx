import React, { useState } from 'react';
import axios from 'axios';

const Maintenance = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    block: '',
    roomNo: '',
    date: '',
    time: '',
    maintenance_type: '', // Initialize with an empty string or default value
    comments: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend API
      const response = await axios.post('http://localhost:5000/api/v1/service/maintenance', {
        rollnum: formData.rollNo,
        room: formData.roomNo,
        block: formData.block,
        description: formData.comments,
        date: formData.date,
        time: formData.time,
        maintenanceType: formData.maintenance_type,
        status: 'pending', // Optionally set the status here
      });
      console.log("efrghjvgfxdbgn vgchfghdfx vcbnm", response.data);

      // Handle success response
      setMessage('Room cleaning request submitted successfully!');
      setError('');
    } catch (err) {
      // Handle error response
      setError('Failed to submit room cleaning request. Please try again.');
      setMessage('');
      console.error('Error submitting room cleaning request:', err);
    }
  };

  return (
    <div className="min-h-screen px-1 py-3 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Maintenance Request</h1>
        <form
          className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollNo">
              Roll No
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rollNo"
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex">
            <div className="mb-4 mr-5">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="block">
                Block
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="block"
                type="text"
                name="block"
                value={formData.block}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNo">
                Room No
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="roomNo"
                type="text"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maintenance_type">
              Maintenance Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="maintenance_type"
              name="maintenance_type"
              value={formData.maintenance_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Maintenance Type</option>
              <option value="AC">AC</option>
              <option value="Furniture">Furniture</option>
              <option value="Electrical">Electrical</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
              Extra Comments
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Maintenance;
