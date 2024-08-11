import React from 'react';
import maintenance from '../assets/maintenence.png';
import cleaning from '../assets/cleaning.png';
import healthcare from '../assets/healthcare.jpeg';
import profile from '../assets/room_cleaning.jpg';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Hostel Management Dashboard</h1>
        
        <h1 className="text-l mb-8 text-center">Select your Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/maintenance" className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={maintenance} alt="Maintenance" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Maintenance</h2>
              <p className="text-gray-700">Manage and request maintenance services.</p>
            </div>
          </Link>
          <Link to="/roomcleaning" className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={cleaning} alt="Room Cleaning" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Room Cleaning</h2>
              <p className="text-gray-700">Request room cleaning services.</p>
            </div>
          </Link>
          <Link to="/healthIssue" className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img src={healthcare} alt="Healthcare" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Healthcare</h2>
              <p className="text-gray-700">Access healthcare services.</p>
            </div>
          </Link>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
           
            <img src={profile} alt="Profile" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Profile</h2>
              <p className="text-gray-700">Manage your profile and settings.</p>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
