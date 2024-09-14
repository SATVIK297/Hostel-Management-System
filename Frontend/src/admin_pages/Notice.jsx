import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"; // Don't forget to import axios

const CreateNotice = () => {
  const [notices, setNotices] = useState([]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const currentAdmin = useSelector((state) => state.admin.currentAdmin);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    const newNotice = { heading, content };

    if (heading && content) {
      setNotices([newNotice, ...notices]); // Add the new notice to the top of the list
      setHeading(""); // Clear the input fields
      setContent("");
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/v1/admin/notice/${currentAdmin._id}`, {
        AdminId: currentAdmin._id, // Include the admin ID
        headline : heading,
        content : content,
      });

      console.log(response);
      
      setMessage("Notice created successfully!"); // Success message
      setError("");
    } catch (err) {
      setError("Failed to create notice. Please try again."); // Error message
      setMessage("");
      console.error("Error creating notice:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-6">Hostel Admin Notice Board</h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={handleCreateNotice}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl"
      >
        <h2 className="text-2xl font-semibold mb-4">Create a Notice</h2>

        <div className="mb-4">
          <label
            htmlFor="heading"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Notice Heading
          </label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            placeholder="Enter notice heading"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Notice Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            placeholder="Enter notice content"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Notice
          </button>
        </div>
      </form>

      {/* Displaying the notices */}
      <div className="w-full max-w-xl mt-8">
        <h2 className="text-2xl font-semibold mb-4">All Notices</h2>
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <h3 className="text-xl font-bold">{notice.heading}</h3>
              <p className="mt-2 text-gray-700">{notice.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No notices to display</p>
        )}
      </div>
    </div>
  );
};

export default CreateNotice;
