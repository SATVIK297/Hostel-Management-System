import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HealthcareRequest = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const [formData, setFormData] = useState({
    mealType: 'Breakfast',
    startDate: '',
    endDate: '',
    comments: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend API
      const response = await axios.post('http://localhost:5000/api/v1/service/healthcare', {
        rollnum: currentUser.registrationNumber,
        room: currentUser.roomNumber,
        block: currentUser.block,
        mealType: formData.mealType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.comments,
        status: 'pending',
      });
      console.log(response.data);

      // Handle success response
      setMessage('Healthcare request submitted successfully!');
      setError('');
    } catch (err) {
      // Handle error response
      setError('Failed to submit healthcare request. Please try again.');
      setMessage('');
      console.error('Error submitting healthcare request:', err);
    }
  };

  return (
    <div className="min-h-screen px-1 py-3 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Healthcare Request</h1>
        <form
          className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mealType">
              Meal Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mealType"
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              required
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="All">All</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
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

export default HealthcareRequest;
