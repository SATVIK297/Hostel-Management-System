import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/signup', { email, password });
      if (response.data.status === 200) {
        setOtpSent(true);
      }
    } catch (err) {
      setError(err.response.data.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/verify-otp', { email, otp, password });
      if (response.data.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response.data.message || 'Failed to verify OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">{otpSent ? 'Verify OTP' : 'Sign Up'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignup}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 mb-4 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
