import React, { useState } from 'react';
import RoomCleaning from './RoomCleaning';
import Roomclean_status from './Roomclean_status';

const Roomclean_main = () => {
  const [activePage, setActivePage] = useState('request');

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-center mb-2">
          <button
            onClick={() => setActivePage('request')}
            className={`px-4 py-2 mx-2 font-bold rounded ${
              activePage === 'request' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Room Cleaning Request
          </button>
          <button
            onClick={() => setActivePage('status')}
            className={`px-4 py-2 mx-2 font-bold rounded ${
              activePage === 'status' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Status
          </button>
        </div>
        <div>
          {activePage === 'request' ? <RoomCleaning /> : <Roomclean_status />}
        </div>
      </div>
    </div>
  );
};

export default Roomclean_main;
