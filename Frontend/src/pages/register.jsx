// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logoImage from '../assets/VIT LOGO.png'; // Adjust the path if needed

// const Register = ({ onRegister }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [roomNumber, setRoomNumber] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement your registration logic here
//     // If registration is successful, call onRegister
//     onRegister();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
//       <img src={logoImage} alt="Logo" className="w-24 lg:w-44 h-auto mb-8" />
//       <div className="w-full max-w-md">
//         <form onSubmit={handleSubmit} className="bg-blue-100 shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4">
//           <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
//               Room Number
//             </label>
//             <input
//               type="text"
//               id="roomNumber"
//               value={roomNumber}
//               onChange={(e) => setRoomNumber(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Register
//             </button>
//           </div>
//           <div className="text-center mt-4">
//               <p className="text-gray-700">Already registered? <Link to="/" className="text-blue-500 hover:text-blue-700">Login here</Link></p>
//             </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../assets/VIT LOGO.png'; // Adjust the path if needed

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationNumber, setregistrationNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/signup', { email, password, registrationNumber });
      if (response.data.status === 200) {
        console.log(response.data)
        setOtpSent(true);
      }
    } catch (err) {
      setError(err.response.data.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/verify-otp', { email, otp, password });
      if (response.data.status === 200) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data.message || 'Failed to verify OTP');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <img src={logoImage} alt="Logo" className="w-24 lg:w-44 h-auto mb-8" />
      <div className="w-full max-w-md">
        <form
          onSubmit={otpSent ? handleVerifyOtp : handleSignup}
          className="bg-blue-100 shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            {otpSent ? 'Verify OTP' : 'Sign Up'}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!otpSent ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => setregistrationNumber(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
               
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Already registered? <Link to="/" className="text-blue-500 hover:text-blue-700">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
