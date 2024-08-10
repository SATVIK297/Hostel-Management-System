import React, { useState } from 'react';
import Maintenance from './Maintenance';
import Maintenance_status from './maintenance_status';

const Maintenance_main = () => {
  const [activePage, setActivePage] = useState('request');

  return (
    <div className="min-h-screen bg-orange-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-center mb-2">
          <button
            onClick={() => setActivePage('request')}
            className={`px-4 py-2 mx-2 font-bold rounded ${
              activePage === 'request' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Maintenance Request
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
          {activePage === 'request' ? <Maintenance /> : <Maintenance_status />}
        </div>
      </div>
    </div>
  );
};

export default Maintenance_main;
