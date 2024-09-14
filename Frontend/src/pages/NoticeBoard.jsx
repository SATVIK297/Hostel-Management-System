import React, { useState } from 'react';

const notices = [
  {
    id: 1,
    headline: "Room Inspection on August 15th",
    date: "2024-08-10",
    content: "There will be a room inspection on August 15th. Please ensure that your rooms are clean and organized.",
  },
  {
    id: 2,
    headline: "New Mess Timings",
    date: "2024-08-12",
    content: "The mess timings have been revised. Breakfast: 7 AM - 9 AM, Lunch: 12 PM - 2 PM, Dinner: 7 PM - 9 PM.",
  },
  {
    id: 3,
    headline: "Maintenance Schedule",
    date: "2024-08-14",
    content: "Scheduled maintenance work will be carried out in Block A on August 20th. Please cooperate with the staff.",
  },
];

const NoticeBoard = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleClosePopup = () => {
    setSelectedNotice(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Notice Board</h1>
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-200"
              onClick={() => handleNoticeClick(notice)}
            >
              <div className="text-xl font-semibold">{notice.headline}</div>
              <div className="text-gray-500">{notice.date}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedNotice.headline}</h2>
            <p className="mb-4">{selectedNotice.content}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
