import React, { useState } from 'react';
import profile from '../assets/profile.png';
import Avatar from 'react-avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {signOutSuccess} from "../redux/user/userSlice"


const Header = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        dispatch(signOutSuccess()); //it makes the current user null
      }
    } catch (error) {
      console.log(error.message);
    }
    navigate('/'); // Redirect to login after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold ml-5">Hostel Management System</Link>

        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <Avatar name="John Doe" src={profile} size="40" round={true} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                View Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
