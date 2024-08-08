import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../assets/hostal.png'; // Adjust the path if needed
import logoImage from '../assets/VIT LOGO.png'; // Adjust the path if needed

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    // If login is successful, call onLogin
    onLogin();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img src={loginImage} alt="Login" className="w-5/6 h-auto" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <img src={logoImage} alt="Logo" className="w-24 lg:w-44 h-auto mb-8" />
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-blue-100 shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-700">Not registered? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
